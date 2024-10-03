import pycountry
import pycountry_convert as pc
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import joblib

scaler = joblib.load('../scaler.pkl')

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

# Sample function to preprocess user input for prediction
def preprocess_user_input(user_input, columns,scaler):
    # 1. Convert country to continent
    user_input['Continent'] = country_to_continent(user_input['country'])
    del user_input['country']  # Remove country as it's no longer needed

    # 2. Create a DataFrame for the user input (treating it as one row of the dataset)
    input_df = pd.DataFrame([user_input])

    # 3. One-Hot encode categorical variables (must match the columns in training data)
    input_df = pd.get_dummies(input_df, columns=['gender', 'education_level', 'marital_status', 'loan_purpose', 'employment_status', 'payment_history', 'Continent'])

    # 4. Ensure the user input DataFrame has the same columns as the training data
    # If a column is missing, add it with a default value of 0
    for col in columns:
        if col not in input_df.columns:
            input_df[col] = 0

    # Reorder the columns to match the training data
    input_df = input_df[columns]
  
    # 5. Normalize the numerical columns (using the same scaler used during training)
    scaled_input = scaler.transform(input_df)
    
    return scaled_input