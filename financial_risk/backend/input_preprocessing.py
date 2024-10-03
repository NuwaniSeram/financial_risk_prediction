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


def preprocess_user_input(user_input, columns,scaler):
    #  Convert country to continent
    user_input['Continent'] = country_to_continent(user_input['country'])
    del user_input['country'] 

    
    input_df = pd.DataFrame([user_input])


    input_df = pd.get_dummies(input_df, columns=['gender', 'education_level', 'marital_status', 'loan_purpose', 'employment_status', 'payment_history', 'Continent'])

    for col in columns:
        if col not in input_df.columns:
            input_df[col] = 0

    
    input_df = input_df[columns]
  
    
    scaled_input = scaler.transform(input_df)
    
    return scaled_input