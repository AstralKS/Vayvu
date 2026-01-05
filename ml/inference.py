"""
Flask API for model inference.
This is used for local development and testing.
For production on Vercel, the prediction logic is in the Node.js backend.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import os

from model import CrowdPredictionModel, preprocess_features, CROWD_LEVELS

app = Flask(__name__)
CORS(app)

# Load model
model = None
model_path = os.path.join(os.path.dirname(__file__), 'model.pth')


def load_model():
    global model
    if model is None:
        model = CrowdPredictionModel()
        if os.path.exists(model_path):
            checkpoint = torch.load(model_path, map_location='cpu')
            model.load_state_dict(checkpoint['model_state_dict'])
            print(f"✅ Loaded model from {model_path}")
        else:
            print("⚠️ No trained model found, using random weights")
        model.eval()
    return model


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


@app.route('/predict', methods=['POST'])
def predict():
    """
    Make a crowd prediction.
    
    Expected JSON body:
    {
        "hour": int (0-23),
        "day_of_week": int (0-6),
        "is_weekend": bool,
        "is_holiday": bool,
        "weather_score": float (0-1),
        "route_type": int (0-3)
    }
    """
    try:
        data = request.json
        
        # Extract features
        hour = int(data.get('hour', 12))
        day_of_week = int(data.get('day_of_week', 0))
        is_weekend = bool(data.get('is_weekend', False))
        is_holiday = bool(data.get('is_holiday', False))
        weather_score = float(data.get('weather_score', 0.0))
        route_type = int(data.get('route_type', 0))
        
        # Preprocess
        features = preprocess_features(
            hour=hour,
            day_of_week=day_of_week,
            is_weekend=is_weekend,
            is_holiday=is_holiday,
            weather_score=weather_score,
            route_type=route_type
        )
        
        # Predict
        model = load_model()
        with torch.no_grad():
            output = model(features)
            probs = torch.softmax(output, dim=1)
            pred_class = torch.argmax(probs, dim=1).item()
            confidence = probs[0, pred_class].item()
        
        return jsonify({
            'success': True,
            'prediction': {
                'class': pred_class,
                'label': CROWD_LEVELS[pred_class],
                'confidence': confidence,
                'probabilities': {
                    'Low': probs[0, 0].item(),
                    'Medium': probs[0, 1].item(),
                    'High': probs[0, 2].item()
                }
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400


if __name__ == '__main__':
    load_model()
    app.run(host='0.0.0.0', port=5000, debug=True)
