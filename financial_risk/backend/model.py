import joblib
import os

# Load the trained model
def load_model():
    model_path = os.path.join(os.path.dirname(__file__), '..', 'model.pkl')
    return joblib.load(model_path)

# Load the scaler
def load_scaler():
    scaler_path = os.path.join(os.path.dirname(__file__), '..', 'scaler.pkl')
    return joblib.load(scaler_path)
