import json
from base64 import b64decode

import tensorflow as tf
from flask import Flask, request

app = Flask(__name__)

# Load EfficientNetV2M trained on SD-198
print("Loading model...")
serving_model = tf.saved_model.load("./api/model")
print("Model loaded!")

# Load labels
print("Loading labels...")
labels = None
with open("./api/labels.txt", "r") as file:
    labels = [line for line in file]
print("Labels loaded!")


@app.route("/classify", methods=["POST"])
def classify() -> json:
    # Get image from user
    data = request.get_json()
    image_data = data["image"]
    print("Image data received")

    # Decode image data and convert to PIL Image
    image_bytes = b64decode(image_data.split(",")[1])
    image = tf.image.decode_image(image_bytes)
    image = tf.image.resize(image, (480, 480))
    image = tf.expand_dims(image, 0)

    # Predict the class
    print("Predicting class...")
    predictions = serving_model.serve(image).numpy().flatten()

    # Sort and save top 5 conditions
    sorted_indices = predictions.argsort()[::-1][:5]
    top_predictions = {
        str(labels[i]): float(predictions[i] * 100) for i in sorted_indices
    }

    print("Predictions made!")
    print(top_predictions)

    return top_predictions


if __name__ == "__main__":
    app.run()
