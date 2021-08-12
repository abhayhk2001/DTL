from flask import Flask
from flask import request
from nmit import perdictpercentage, preprocessing
import numpy as np
import pandas as pd
from flask import jsonify


from flask_ngrok import run_with_ngrok
app = Flask(__name__)
run_with_ngrok(app)


def countryVaccination():
    dataf = pd.read_csv("cowin_vaccine_data_statewise.csv")
    dataf = dataf[[dataf.columns[0], dataf.columns[1], dataf.columns[2],
                   dataf.columns[3], dataf.columns[5], dataf.columns[6], dataf.columns[14], dataf.columns[15], dataf.columns[16]]][:154]
    dataf = dataf.reset_index()
    dataf = dataf.drop(columns=["index"])
    return dataf


def statewiseVaccination(stateID):
    dataf = pd.read_csv("cowin_vaccine_data_statewise.csv")
    dataf = dataf[[dataf.columns[0], dataf.columns[1], dataf.columns[2],
                   dataf.columns[3], dataf.columns[5], dataf.columns[6], dataf.columns[14], dataf.columns[15], dataf.columns[16]]][((stateID)*154):((stateID+1)*154)]
    dataf = dataf.reset_index()
    dataf = dataf.drop(columns=["index"])
    return dataf


@app.route('/')
def hello():
    return "Hello World"


States_Id = {
    "Andaman and Nicobar Islands": 0,
    "Andhra Pradesh": 1,
    "Arunachal Pradesh": 2,
    "Assam": 3,
    "Bihar": 4,
    "Chandigarh": 5,
    "Chhattisgarh": 6,
    "Dadra and Nagar Haveli and Daman and Diu": 7,
    "Delhi": 8,
    "Goa": 9,
    "Gujarat": 10,
    "Haryana": 11,
    "Himachal Pradesh": 12,
    "Jammu and Kashmir": 13,
    "Jharkhand": 14,
    "Karnataka": 15,
    "Kerala": 16,
    "Ladakh": 17,
    "Lakshadweep": 18,
    "Madhya Pradesh": 19,
    "Maharashtra": 20,
    "Manipur": 21,
    "Meghalaya": 22,
    "Mizoram": 23,
    "Nagaland": 24,
    "Odisha": 25,
    "Puducherry": 26,
    "Punjab": 27,
    "Rajasthan": 28,
    "Sikkim": 29,
    "Tamil Nadu": 30,
    "Telangana": 31,
    "Tripura": 32,
    "Uttar Pradesh": 33,
    "Uttarakhand": 34,
    "West Bengal": 35,
}

lat_long = {
    "Andaman and Nicobar Islands": (12.547000, 92.847444),
    "Andhra Pradesh": (14.964891, 78.565374),
    "Arunachal Pradesh": (28.434200, 94.410072),
    "Assam": (26.381005, 92.338387),
    "Bihar": (25.600872, 85.999276),
    "Chandigarh": (30.639649, 76.747766),
    "Chhattisgarh": (21.459304, 81.791999),
    "Dadra and Nagar Haveli and Daman and Diu": (20.323866, 72.966239),
    "Delhi": (28.663640, 77.106442),
    "Goa": (15.416344, 74.076313),
    "Gujarat": (22.694480, 71.723071),
    "Haryana": (29.294663, 76.287371),
    "Himachal Pradesh": (32.025819, 76.896699),
    "Jammu and Kashmir": (33.679364, 75.623102),
    "Jharkhand": (23.599424, 85.336120),
    "Karnataka": (14.830563, 75.869886),
    "Kerala": (10.693232, 76.289979),
    "Ladakh": (34.727838, 76.661739),
    "Lakshadweep": (10.908892, 72.866279),
    "Madhya Pradesh": (23.391288, 78.106727),
    "Maharashtra": (19.558571, 75.976950),
    "Manipur": (24.775500, 93.861622),
    "Meghalaya": (25.552480, 91.387458),
    "Mizoram": (23.316567, 92.815155),
    "Nagaland": (26.163317, 94.363439),
    "Odisha": (20.572734, 84.366349),
    "Puducherry": (11.939271, 79.812481),
    "Punjab": (30.917004, 75.425957),
    "Rajasthan": (26.812521, 73.564003),
    "Sikkim": (27.555512, 88.466123),
    "Tamil Nadu": (11.253384, 78.208186),
    "Telangana": (17.854975, 79.106373),
    "Tripura": (23.777665, 91.659276),
    "Uttar Pradesh": (27.129112, 80.544562),
    "Uttarakhand": (30.089468, 79.010225),
    "West Bengal": (24.844118, 88.028125)
}


@app.route('/predictpercentage', methods=['GET'])
def send_json():
    stateID = States_Id[(request.args['state'])]
    percent = float(request.args['percent'])
    percent /= float(100)
    list = perdictpercentage(stateID, percent)
    days = {"days": max(list)}
    response = jsonify(days)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def predict(stateID, percent):
    percent /= float(100)
    list = perdictpercentage(stateID, percent)
    ans = np.abs(max(list))
    return ans


@app.route('/popup/india', methods=['GET'])
def get_api():
    df = countryVaccination()
    (df2, X, Y) = preprocessing(1)
    firstdose_cumilative = int(
        df.iloc[df.shape[0]-1]['First Dose Administered'])
    seconddose_cumilative = int(
        df.iloc[df.shape[0]-1]['Second Dose Administered'])
    latestVaccinated = int(df2[df2.columns[df2.shape[1]-1]].sum())
    Y = list(df["First Dose Administered"])
    data = {
        "first": firstdose_cumilative,
        "second": seconddose_cumilative,
        "latest": latestVaccinated,
        "lables": list(range(1, len(Y))),
        "data": Y,
        "label": "First Dose Vaccinated vs Days",
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@app.route('/map/india', methods=['GET'])
def recieve_json():
    data = {
        "data": []
    }
    for statename in States_Id.keys():
        dict = {
            "stateName": statename,
            "stateInfo": {
                "id": States_Id[statename],
                "lat": 1,
                "long": 1,
            },
            "vaccinationRate": 1,
            "firstDose": 1,
            "secondDose": 1
        }
        dict['stateInfo']['lat'] = lat_long[statename][0]
        dict['stateInfo']['long'] = lat_long[statename][1]
        df = statewiseVaccination(States_Id[statename]+1)
        dict["firstDose"] = int(df.iloc[df.shape[0]-1]
                                ['First Dose Administered'])
        dict["secondDose"] = int(
            df.iloc[df.shape[0]-1]['Second Dose Administered'])
        dict["vaccinationRate"] = int(df.iloc[df.shape[0]-1]['Total Individuals Vaccinated']) - int(
            df.iloc[df.shape[0]-2]['Total Individuals Vaccinated'])
        data["data"].append(dict)
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@app.route('/map/state', methods=['GET'])
def Recieve_json():
    stateID = States_Id[(request.args['state'])]
    df = statewiseVaccination(stateID+1)
    predict25 = predict(stateID, 25)
    predict50 = predict(stateID, 50)
    predict65 = predict(stateID, 65)
    Y = list(df["First Dose Administered"])
    data = {
        "block1": {
            "labels": ["18-44", "45-60", "60+"],
            "info": [int(df.iloc[df.shape[0]-1]['18-45 years (Age)']), int(
                df.iloc[df.shape[0]-1]['45-60 years (Age)']), int(
                df.iloc[df.shape[0]-1]['60+ years (Age)'])]
        },
        "block2": {
            "labels": ["25%", "50%", "65%"],
            "info": [predict25, predict50, predict65]
        },
        "first": {
            "label": "Total Vaccines Administered vs Days",
            "data": Y,
            "labels": list(range(1, len(Y))),
        },
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@ app.route('/graph/cumilative', methods=['GET'])
def cumilative():
    df = countryVaccination()
    Y = list(df["Total Individuals Vaccinated"])
    data = {
        "label": "Total Vaccines Administered vs Days",
        "data": Y,
        "labels": list(range(1, len(Y))),
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@ app.route('/graph/first', methods=['GET'])
def first():
    df = countryVaccination()
    Y = list(df["First Dose Administered"])
    data = {
        "label": "Total Vaccines Administered vs Days",
        "data": Y,
        "labels": list(range(1, len(Y))),
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@ app.route('/graph/second', methods=['GET'])
def second():
    df = countryVaccination()
    Y = list(df["Second Dose Administered"])
    data = {
        "label": "Total Vaccines Administered vs Days",
        "data": Y,
        "labels": list(range(1, len(Y))),
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@ app.route('/graph/current', methods=['GET'])
def current():
    df = countryVaccination()
    Y = list(df["Total Individuals Vaccinated"])
    Y = [Y[0]] + [Y[i+1]-Y[i] for i in range(len(Y)-1)]
    data = {
        "label": "Total Vaccines Administered vs Days",
        "data": Y,
        "labels": list(range(1, len(Y))),
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)

#################


@ app.route('/graphs/cumilative', methods=['GET'])
def stateCumilative():
    stateID = States_Id['Karnataka']
    df = statewiseVaccination(stateID+1)
    Y = list(df["Total Individuals Vaccinated"])
    data = {
        "label": "Total Vaccines Administered vs Days",
        "data": Y,
        "labels": list(range(1, len(Y))),
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@ app.route('/graphs/first', methods=['GET'])
def stateFirst():
    stateID = States_Id['Karnataka']
    df = statewiseVaccination(stateID+1)
    Y = list(df["First Dose Administered"])
    data = {
        "label": "Total Vaccines Administered vs Days",
        "data": Y,
        "labels": list(range(1, len(Y))),
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@ app.route('/graphs/second', methods=['GET'])
def stateSecond():
    stateID = States_Id['Karnataka']
    df = statewiseVaccination(stateID+1)
    Y = list(df["Second Dose Administered"])
    data = {
        "label": "Total Vaccines Administered vs Days",
        "data": Y,
        "labels": list(range(1, len(Y))),
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


@ app.route('/graphs/current', methods=['GET'])
def stateCurrent():
    stateID = States_Id['Karnataka']
    df = statewiseVaccination(stateID+1)
    Y = list(df["Total Individuals Vaccinated"])
    Y = [Y[0]] + [Y[i+1]-Y[i] for i in range(len(Y)-1)]
    data = {
        "label": "Total Vaccines Administered vs Days",
        "data": Y,
        "labels": list(range(1, len(Y))),
    }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return (response)


if __name__ == '__main__':
    app.run()
