import joblib

def load_model():
    # Load the saved model
    return joblib.load('../model.pkl')

def load_scaler():
     return joblib.load('../scaler.pkl')