from flask import Flask, request, jsonify
import joblib
import numpy as np
from input_preprocessing import preprocess_user_input
from model import load_model, load_scaler
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = load_model()
scaler = load_scaler()


dummy_columns = ['Age', 'Income', 'Credit Score', 'Loan Amount', 'Years at Current Job', 
    'Debt-to-Income Ratio', 'Assets Value', 'Number of Dependents',
    'Previous Defaults', 'Marital Status Change', 'Gender_Female',
    'Gender_Male', 'Gender_Non-binary', 'Education Level_Bachelor\'s',
    'Education Level_High School', 'Education Level_Master\'s',
    'Education Level_PhD', 'Marital Status_Divorced',
    'Marital Status_Married', 'Marital Status_Single',
    'Marital Status_Widowed', 'Loan Purpose_Auto', 'Loan Purpose_Business',
    'Loan Purpose_Home', 'Loan Purpose_Personal',
    'Employment Status_Employed', 'Employment Status_Self-employed',
    'Employment Status_Unemployed', 'Payment History_Excellent',
    'Payment History_Fair', 'Payment History_Good', 'Payment History_Poor',
    'Continent_Africa', 'Continent_Antarctica', 'Continent_Asia',
    'Continent_Europe', 'Continent_North America', 'Continent_Oceania',
    'Continent_South America', 'Continent_Unknown']




@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
       
        processed_data = preprocess_user_input(data, dummy_columns,scaler)
        
       
        prediction = model.predict(processed_data)
        
       
        predicted_risk = int(prediction[0])
        
        reverse_risk_mapping = {1: 'Low', 2: 'Medium', 3: 'High'}
        
        risk_category = reverse_risk_mapping.get(prediction[0],'unknown')
        
        
        result = {
            'Low': 'Approved',
            'Medium': 'Requires Further Review',
            'High': 'Not Approved'
        }[risk_category]
        
        return jsonify({
            'status': result,
            'risk': risk_category  
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
