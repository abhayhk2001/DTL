"""
Original file is located at
    https://colab.research.google.com/drive/1mh8iQAY5njBV5pVeU7qSl6iQop5IDhdH
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import metrics
from sklearn.preprocessing import PolynomialFeatures
from flask import json


def preprocessing(state_id):
    df = pd.read_csv("vaccine_doses_statewise.csv")
    arr_size = df.shape[1]-1
    df2 = pd.DataFrame(columns=df.columns)
    arr = []
    for i in range(arr_size, 0, -1):
        arr.append(df.columns[i])
    for i, j in zip(arr[1:], arr):
        df2[j] = df[j] - df[i]
    df2['State'] = df['State']
    df2.drop("16/01/2021", axis=1, inplace=True)
    X = []
    for i in range(1, arr_size):
        X.append(i)
    new_data = []
    factor = 100
    for i in range(1, arr_size):
        new_data.append(df2.loc[state_id][i] + factor)
    Y = new_data
    X = np.array(X).reshape(-1, 1)
    Y = np.array(Y).reshape(-1, 1)
    return (df2, X, Y)


def findStatePopulation(stateId):
    return 60000000


def cumilativeSum(df2, state_id):
    mylist = df2.iloc[state_id][1:]
    days = 7
    cumsum, moving_aves = [0], []

    for i, x in enumerate(mylist, 1):
        cumsum.append(cumsum[i-1] + x)
        if i >= days:
            moving_ave = (cumsum[i] - cumsum[i-days])/days
            moving_aves.append(moving_ave)
    return (cumsum, moving_aves)


def predict(X, cumsum, state_population, calc_percentage):
    Y = cumsum[1:]
    X_train, X_test, y_train, y_test = train_test_split(
        X, Y, test_size=0.2, random_state=0)
    poly_reg = PolynomialFeatures(degree=3)
    X_poly = poly_reg.fit_transform(X)
    pol_reg = LinearRegression()
    pol_reg.fit(X_poly, Y)
    intercept = pol_reg.intercept_
    coeff = (list(pol_reg.coef_)[1:])
    coeff.reverse()
    coeff.append(intercept)
    coeff[3] = coeff[3]-(state_population*calc_percentage)
    return np.roots(coeff)


def viz_polymonial(X, Y, poly_reg, pol_reg):
    plt.scatter(X, Y, color='red')
    plt.plot(X, pol_reg.predict(poly_reg.fit_transform(X)), color='blue')
    plt.title('Polynomial Regression')
    plt.xlabel('Days')
    plt.ylabel('No of vaccines')
    plt.show()
    return


def perdictpercentage(stateID, calc_percentage):
    (df2, X, Y) = preprocessing(stateID)
    (cumsum, moving_aves) = cumilativeSum(df2, stateID)
    state_population = findStatePopulation(stateID)
    return predict(X, cumsum, state_population, calc_percentage)


print(perdictpercentage(15, 0.25))
