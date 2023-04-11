import threading
from flask import Flask, render_template, request
from flask_cors import CORS

import sirius_orbit_monitor as som

app = Flask(__name__)
CORS(app)

# Returns the list of signature with the information
# about the correlation with the COD Rebuilt
@app.route("/sign_comp", methods=["GET"])
def signComp():

    signature_files = [
            'C_kick', 'D_kick',
            'Q_kick', 'S_kick'
    ]

    read_json = True#not app.SIGNATURES
    cod_rebuilt = som.calc_cod_rebuilt(
                request.args.get("start"), request.args.get("stop"))
    corr = som.calc_correlation(
        cod_rebuilt, signature_files, read_json)
    return corr


# Returns the CODX and CODY of the COD Rebuilt
# and the signatures select on the URL
@app.route("/sign_orbit", methods=["GET"])
def signOrbit():
    sign_orbit = dict()
    read_json = True#not app.SIGNATURES
    data = request.args.get("data")
    data = data.split(',')

    for name in data:

        if name == 'cod_rebuilt':
            cod_rebuilt = som.calc_cod_rebuilt(
                request.args.get("start"), request.args.get("stop"))

            sign_orbit['cod_rebuilt'] = [
                som.normalized_array(cod_rebuilt[:160]).tolist(),
                som.normalized_array(cod_rebuilt[160:]).tolist()]
        else:
            elem_data = name.split("_")
            elem_name = elem_data[0] + elem_data[1]

            sign_orbit[elem_name] = som.read_signatures(
                elem_data, read_json)
    return sign_orbit


# Operation done with server initialization
def run_job():
    print("Initializing!")
    som.initialization()
    # app.SIGNATURES = calc_signatures.calc_sign()


# Runs after the server initialization
@app.before_first_request
def before_first_request():
    thread = threading.Thread(target=run_job)
    thread.start()


# Returns the page with the information about the URL Request
@app.route("/")
def home():
    return render_template('index.html')


if __name__ == "__main__":
    # app.SIGNATURES = {}
    app.run(debug=False)
