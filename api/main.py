from base64 import b64decode

import requests
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS

# Setup Flask
app = Flask(__name__)
CORS(app)

# TensorFlow Serving URL
TF_SERVING_URL = "http://tensorflow-serving:8501/v1/models/model:predict"

# Load labels
print("Loading labels...")
labels = None
with open("./labels.txt", "r") as file:
    labels = [line for line in file]
print("Labels loaded!")

print("Server is ready!")


@app.route("/classify", methods=["POST"])
def classify():
    # Get image from user
    data = request.get_json()
    image_data = data["image"]
    print("Image data received")

    # Decode image
    image_bytes = b64decode(image_data.split(",")[1])
    image = tf.image.decode_image(image_bytes)

    # Preprocess image
    image = tf.image.resize(image, (480, 480))
    image = tf.expand_dims(image, 0)

    # Prepare the request payload
    image_list = image.numpy().tolist()
    payload = {"instances": [image_list]}

    # Make POST request to TensorFlow Serving API
    print("Sending request to TensorFlow Serving...")
    response = requests.post(TF_SERVING_URL, json=payload)

    # Handle any errors in the TensorFlow Serving response
    if response.status_code != 200:
        return (
            jsonify(
                {
                    "error": "Failed to get response from TensorFlow Serving",
                    "code": response.status_code,
                }
            ),
            response.status_code,
        )

    # Process the results
    predictions = response.json()["predictions"][0]
    sorted_indices = sorted(
        range(len(predictions)), key=lambda i: predictions[i], reverse=True
    )[:5]
    top_predictions = {labels[i]: predictions[i] * 100 for i in sorted_indices}

    print("Predictions made!")
    for condition, probability in top_predictions.items():
        print(f"{condition.strip()}: {probability:.2f}%")

    return jsonify(top_predictions)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
