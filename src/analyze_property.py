import pandas as pd
import numpy as np
from fbprophet import Prophet

p_data = Prophet()

def predict_data(data, population_code, num):
    p_data.fit(data)

    is_prediction = p_data.make_future_dataframe(periods = 72, freq = 'd')
    prediction_data = p_data.predict(is_prediction)

    population = prediction_data[
        [
            'ds', 'yhat'
        ]
    ].tail(62)

    num[population_code] = np.nan
    num[population_code] = population['yhat']
    num['date'] = population['ds']

    num = num.rename({
        'ds': 'date',
        'yhat': population_code
    })