from base64 import b64decode
from flask import Flask, request
from flask_cors import CORS
import json
import tensorflow as tf

# Setup Flask
app = Flask(__name__)
CORS(app)

# Load EfficientNetV2M trained on SD-198
print("Loading model...")
serving_model = tf.saved_model.load("./model")
print("Model loaded!")

# Load labels
print("Loading labels...")
labels = None
with open("./labels.txt", "r") as file:
    labels = [line for line in file]
print("Labels loaded!")

print("Server is ready!")

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
    for condition, probability in top_predictions.items():
        print(f"{condition.strip()}: {(probability):.2f}%")

    return top_predictions

if __name__ == "__main__":
    app.run(host="0.0.0.0")
