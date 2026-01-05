"""
Crowd Prediction Neural Network Model
A simple MLP for predicting crowd levels based on temporal and environmental features.
"""

import torch
import torch.nn as nn
import torch.nn.functional as F


class CrowdPredictionModel(nn.Module):
    """
    A 3-layer MLP for crowd level prediction.
    
    Input features:
    - hour (0-23, normalized)
    - day_of_week (0-6, normalized)
    - is_weekend (0 or 1)
    - is_holiday (0 or 1)
    - is_peak_hour (0 or 1)
    - weather_score (0-1, higher = worse weather)
    - route_type (0-3: metro, bus, train, tram)
    
    Output:
    - 3 classes: Low, Medium, High
    """
    
    def __init__(self, input_size: int = 7, hidden_size: int = 32, num_classes: int = 3):
        super().__init__()
        
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.bn1 = nn.BatchNorm1d(hidden_size)
        self.dropout1 = nn.Dropout(0.2)
        
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.bn2 = nn.BatchNorm1d(hidden_size)
        self.dropout2 = nn.Dropout(0.2)
        
        self.fc3 = nn.Linear(hidden_size, num_classes)
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Layer 1
        x = self.fc1(x)
        x = self.bn1(x)
        x = F.relu(x)
        x = self.dropout1(x)
        
        # Layer 2
        x = self.fc2(x)
        x = self.bn2(x)
        x = F.relu(x)
        x = self.dropout2(x)
        
        # Output layer
        x = self.fc3(x)
        return x
    
    def predict(self, x: torch.Tensor) -> tuple[int, float]:
        """
        Make a prediction and return the class index and confidence.
        """
        self.eval()
        with torch.no_grad():
            logits = self.forward(x)
            probs = F.softmax(logits, dim=1)
            pred_class = torch.argmax(probs, dim=1).item()
            confidence = probs[0, pred_class].item()
        return pred_class, confidence


def preprocess_features(
    hour: int,
    day_of_week: int,
    is_weekend: bool,
    is_holiday: bool,
    weather_score: float,
    route_type: int
) -> torch.Tensor:
    """
    Preprocess raw features into model input tensor.
    """
    # Check if it's peak hour (8-11 AM or 5-9 PM)
    is_peak = (8 <= hour <= 11) or (17 <= hour <= 21)
    
    features = torch.tensor([
        hour / 23.0,              # Normalize hour to 0-1
        day_of_week / 6.0,        # Normalize day to 0-1
        float(is_weekend),
        float(is_holiday),
        float(is_peak),
        weather_score,            # Already 0-1
        route_type / 3.0          # Normalize route type
    ], dtype=torch.float32)
    
    return features.unsqueeze(0)  # Add batch dimension


CROWD_LEVELS = ['Low', 'Medium', 'High']


def get_crowd_level(prediction: int) -> str:
    """Convert prediction index to crowd level string."""
    return CROWD_LEVELS[prediction]


if __name__ == "__main__":
    # Test the model
    model = CrowdPredictionModel()
    print(f"Model architecture:\n{model}")
    
    # Test input
    test_input = preprocess_features(
        hour=9,
        day_of_week=1,  # Monday
        is_weekend=False,
        is_holiday=False,
        weather_score=0.3,
        route_type=0  # Metro
    )
    
    print(f"\nTest input shape: {test_input.shape}")
    print(f"Test input: {test_input}")
    
    # Forward pass
    model.eval()
    with torch.no_grad():
        output = model(test_input)
        print(f"Raw output: {output}")
        
        probs = F.softmax(output, dim=1)
        print(f"Probabilities: {probs}")
        
        pred = torch.argmax(probs, dim=1).item()
        print(f"Prediction: {get_crowd_level(pred)}")
