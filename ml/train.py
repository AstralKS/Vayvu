"""
Training script for the Crowd Prediction Model.
Generates synthetic training data and trains the PyTorch model.
"""

import random
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from model import CrowdPredictionModel, preprocess_features, CROWD_LEVELS


def generate_synthetic_data(num_samples: int = 10000) -> tuple[np.ndarray, np.ndarray]:
    """
    Generate synthetic training data based on realistic patterns.
    
    Assumptions:
    - Peak hours (8-11, 17-21) on weekdays = High crowd
    - Weekends and holidays = Lower crowd
    - Bad weather = Slightly higher crowd (people use transit)
    - Late night = Very low crowd
    """
    features = []
    labels = []
    
    for _ in range(num_samples):
        # Random features
        hour = random.randint(0, 23)
        day_of_week = random.randint(0, 6)
        is_weekend = day_of_week >= 5
        is_holiday = random.random() < 0.05  # 5% chance of holiday
        weather_score = random.random()  # 0-1, higher = worse
        route_type = random.randint(0, 3)
        
        # Calculate base crowd level
        is_peak = (8 <= hour <= 11) or (17 <= hour <= 21)
        is_late_night = hour >= 22 or hour <= 5
        
        # Start with medium crowd score
        score = 0.5
        
        # Peak hour effect (strongest factor)
        if is_peak and not is_weekend and not is_holiday:
            score += 0.35
        elif is_peak:
            score += 0.15
        
        # Weekend/holiday reduces crowd
        if is_weekend:
            score -= 0.15
        if is_holiday:
            score -= 0.25
        
        # Late night = very low
        if is_late_night:
            score -= 0.3
        
        # Weather effect
        if weather_score > 0.7:  # Bad weather
            score += 0.15
        elif weather_score > 0.4:
            score += 0.05
        
        # Route type effect (metro typically more crowded)
        if route_type == 0:  # Metro
            score += 0.05
        elif route_type == 2:  # Train
            score += 0.08
        
        # Add some randomness
        score += random.uniform(-0.1, 0.1)
        
        # Clamp to 0-1
        score = max(0, min(1, score))
        
        # Convert to class
        if score < 0.35:
            label = 0  # Low
        elif score < 0.65:
            label = 1  # Medium
        else:
            label = 2  # High
        
        # Add normalized features
        features.append([
            hour / 23.0,
            day_of_week / 6.0,
            float(is_weekend),
            float(is_holiday),
            float(is_peak),
            weather_score,
            route_type / 3.0
        ])
        labels.append(label)
    
    return np.array(features, dtype=np.float32), np.array(labels, dtype=np.int64)


def train_model(
    model: nn.Module,
    train_loader: DataLoader,
    val_loader: DataLoader,
    num_epochs: int = 50,
    learning_rate: float = 0.001
) -> dict:
    """
    Train the model and return training history.
    """
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Training on {device}")
    
    model = model.to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=20, gamma=0.5)
    
    history = {'train_loss': [], 'val_loss': [], 'val_acc': []}
    
    for epoch in range(num_epochs):
        # Training phase
        model.train()
        train_loss = 0.0
        
        for features, labels in train_loader:
            features, labels = features.to(device), labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(features)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
        
        train_loss /= len(train_loader)
        
        # Validation phase
        model.eval()
        val_loss = 0.0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for features, labels in val_loader:
                features, labels = features.to(device), labels.to(device)
                outputs = model(features)
                loss = criterion(outputs, labels)
                val_loss += loss.item()
                
                _, predicted = torch.max(outputs, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
        
        val_loss /= len(val_loader)
        val_acc = correct / total
        
        scheduler.step()
        
        history['train_loss'].append(train_loss)
        history['val_loss'].append(val_loss)
        history['val_acc'].append(val_acc)
        
        if (epoch + 1) % 10 == 0:
            print(f"Epoch [{epoch+1}/{num_epochs}] - "
                  f"Train Loss: {train_loss:.4f}, "
                  f"Val Loss: {val_loss:.4f}, "
                  f"Val Acc: {val_acc:.4f}")
    
    return history


def main():
    print("=" * 50)
    print("Crowd Prediction Model Training")
    print("=" * 50)
    
    # Set random seeds for reproducibility
    random.seed(42)
    np.random.seed(42)
    torch.manual_seed(42)
    
    # Generate synthetic data
    print("\n📊 Generating synthetic training data...")
    X, y = generate_synthetic_data(num_samples=15000)
    print(f"   Generated {len(X)} samples")
    print(f"   Class distribution: {np.bincount(y)}")
    
    # Split into train/val
    split_idx = int(0.8 * len(X))
    X_train, X_val = X[:split_idx], X[split_idx:]
    y_train, y_val = y[:split_idx], y[split_idx:]
    
    # Create data loaders
    train_dataset = TensorDataset(torch.tensor(X_train), torch.tensor(y_train))
    val_dataset = TensorDataset(torch.tensor(X_val), torch.tensor(y_val))
    
    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=64, shuffle=False)
    
    # Create model
    print("\n🏗️  Creating model...")
    model = CrowdPredictionModel()
    total_params = sum(p.numel() for p in model.parameters())
    print(f"   Total parameters: {total_params}")
    
    # Train
    print("\n🚀 Training model...")
    history = train_model(model, train_loader, val_loader, num_epochs=50)
    
    # Save model
    print("\n💾 Saving model...")
    torch.save({
        'model_state_dict': model.state_dict(),
        'history': history
    }, 'model.pth')
    print("   Saved to model.pth")
    
    # Test predictions
    print("\n🔮 Test predictions:")
    model.eval()
    
    test_cases = [
        {"hour": 9, "day": 1, "weekend": False, "holiday": False, "weather": 0.2, "route": 0},
        {"hour": 18, "day": 2, "weekend": False, "holiday": False, "weather": 0.1, "route": 0},
        {"hour": 14, "day": 6, "weekend": True, "holiday": False, "weather": 0.3, "route": 1},
        {"hour": 10, "day": 3, "weekend": False, "holiday": True, "weather": 0.2, "route": 0},
        {"hour": 23, "day": 4, "weekend": False, "holiday": False, "weather": 0.1, "route": 2},
    ]
    
    for case in test_cases:
        features = preprocess_features(
            hour=case["hour"],
            day_of_week=case["day"],
            is_weekend=case["weekend"],
            is_holiday=case["holiday"],
            weather_score=case["weather"],
            route_type=case["route"]
        )
        
        with torch.no_grad():
            output = model(features)
            probs = torch.softmax(output, dim=1)
            pred = torch.argmax(probs, dim=1).item()
            conf = probs[0, pred].item()
        
        print(f"   Hour {case['hour']:02d}, "
              f"Day {case['day']}, "
              f"Weekend: {case['weekend']}, "
              f"Holiday: {case['holiday']} → "
              f"{CROWD_LEVELS[pred]} ({conf:.2%})")
    
    print("\n✅ Training complete!")


if __name__ == "__main__":
    main()
