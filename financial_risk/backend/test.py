import pycountry
import pycountry_convert as pc
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import joblib
import os

# Function to convert country to continent
def country_to_continent(country_name):
    try:
        country_alpha2 = pycountry.countries.lookup(country_name).alpha_2
        continent_code = pc.country_alpha2_to_continent_code(country_alpha2)
        continents = {
            'AF': 'Africa',
            'AS': 'Asia',
            'EU': 'Europe',
            'NA': 'North America',
            'SA': 'South America',
            'OC': 'Oceania',
            'AN': 'Antarctica'
        }
        return continents[continent_code]
    except (KeyError, LookupError):
        return 'Unknown'

# Load the trained model
def load_model():
    model_path = os.path.join(os.path.dirname(__file__), '..', 'model.pkl')
    return joblib.load(model_path)

# Load the scaler
def load_scaler():
    scaler_path = os.path.join(os.path.dirname(__file__), '..', 'scaler.pkl')
    return joblib.load(scaler_path)

# Function to preprocess user input
def preprocess_user_input(user_input, columns, scaler):
    # 1. Convert country to continent
    user_input['Continent'] = country_to_continent(user_input['country'])
    del user_input['country']  # Remove 'country', as continent will be used instead

    # 2. Create a DataFrame for the user input (treating it as one row)
    input_df = pd.DataFrame([user_input])

    # 3. One-hot encode categorical variables (must match the columns in training data)
    input_df = pd.get_dummies(input_df, columns=[
        'gender', 'education_level', 'marital_status', 
        'loan_purpose', 'employment_status', 'payment_history', 'Continent'
    ])

    # 4. Ensure the user input DataFrame has the same columns as the training data
    # Add any missing columns with a default value of 0
    for col in columns:
        if col not in input_df.columns:
            input_df[col] = 0

    # Reorder the columns to match the training data's column order
    input_df = input_df[columns]

    # 5. Normalize the numerical columns using the same scaler used during training
    scaled_input = scaler.transform(input_df)

    return scaled_input

# Function to predict financial risk
def predict_financial_risk(user_input):
    # Load the model and scaler
    model = load_model()
    scaler = load_scaler()

    # Define the columns used during training (this should match exactly with the model training dataset columns)
    columns = ['Age', 'Income', 'Credit Score', 'Loan Amount', 'Years at Current Job',
               'Debt-to-Income Ratio', 'Assets Value', 'Number of Dependents',
               'Previous Defaults', 'Marital Status Change', 'Gender_Female',
               'Gender_Male', 'Gender_Non-binary', 'Education Level_Bachelor\'s',
               'Education Level_High School', 'Education Level_Master\'s',
               'Education Level_PhD', 'Marital Status_Divorced',
               'Marital Status_Married', 'Marital Status_Single',
               'Marital Status_Widowed', 'Loan Purpose_Auto', 'Loan Purpose_Business',
               'Loan Purpose_Home', 'Loan Purpose_Personal', 'Employment Status_Employed',
               'Employment Status_Self-employed', 'Employment Status_Unemployed',
               'Payment History_Excellent', 'Payment History_Fair', 'Payment History_Good',
               'Payment History_Poor', 'Continent_Africa', 'Continent_Antarctica',
               'Continent_Asia', 'Continent_Europe', 'Continent_North America',
               'Continent_Oceania', 'Continent_South America', 'Continent_Unknown']

    # Preprocess the user input
    preprocessed_input = preprocess_user_input(user_input, columns, scaler)

    # Make prediction
    prediction = model.predict(preprocessed_input)

    # Convert the prediction to risk level
    risk_mapping = {1: 'low', 2: 'medium', 3: 'high'}
    risk_level = risk_mapping.get(prediction[0], 'unknown')

    return risk_level

# Example usage
user_input = {
    'age': 35,
    'gender': 'Male',
    'marital_status': 'Married',
    'marital_status_change': 0,
    'education_level': 'Master\'s',
    'country': 'United States',
    'income': 75000,
    'credit_score': 700,
    'debt_to_income': 0.35,
    'assets_value': 150000,
    'employment_status': 'Employed',
    'years_at_current_job': 5,
    'number_of_dependents': 2,
    'payment_history': 'Good',
    'previous_defaults': 0,
    'loan_purpose': 'Home',
    'loan_amount': 250000
}

# Call the prediction function with the user input
prediction = predict_financial_risk(user_input)
print(f"Risk Level: {prediction}")
