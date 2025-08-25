from flask import Flask, request, jsonify, render_template
import util

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("app.html")   # loads templates/app.html


@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    form_data = {k.strip(): v.strip() for k, v in request.form.items()}
    print("\n=== Incoming Predict Request ===")
    print("Raw Request Form:", request.form)
    print("Cleaned Form Data:", form_data)

    required_fields = ['total_sqft', 'location', 'bhk', 'bath']
    if not all(k in form_data for k in required_fields):
        return jsonify({"error": "Missing form fields", "received": form_data}), 400

    total_sqft = float(form_data['total_sqft'])
    location = form_data['location']
    bhk = int(form_data['bhk'])
    bath = int(form_data['bath'])

    print(f"➡ sqft={total_sqft}, location={location}, bhk={bhk}, bath={bath}")

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()