from base64 import b64decode
from flask import Flask, request
import io
import jax
import json
import keras
from keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)

# Load EfficientNetV2M trained on SD-198
print("Loading model...")
model = keras.saving.load_model("./api/model.keras")
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
    image = load_img(io.BytesIO(image_bytes), target_size=(480, 480))

    # Preprocess image for the model
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))

    # Predict the class
    print("Predicting class...")
    predictions = model.predict(image)

    # Sort and save top 5 conditions
    sorted_predictions = sorted(
        zip(predictions[0], labels), key=lambda x: x[0], reverse=True
    )[:5]
    top_predictions = {str(label): prob * 100 for prob, label in sorted_predictions}

    print("Predictions made!")
    print(top_predictions)

    return top_predictions

if __name__ == "__main__":
    app.run()
