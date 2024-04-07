import tkinter as tk
from tkinter import filedialog, font

import tensorflow as tf

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


class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Skintector")

        customFont = font.Font(family="Times New Roman", size=16, weight="bold")

        # Button to load image and predict
        self.button = tk.Button(
            root,
            text="Load Image and Predict",
            command=self.load_image_and_predict,
            font=customFont,
        )
        self.button.pack(padx=20, pady=20)

    def load_image_and_predict(self):
        # File dialog to choose the image file
        file_path = filedialog.askopenfilename()
        if not file_path:  # If the user cancels, do nothing
            return

        # Use TensorFlow to read and decode the image file
        image_raw = tf.io.read_file(file_path)
        image = tf.image.decode_image(image_raw)
        image = tf.image.resize(image, (480, 480))
        image = tf.expand_dims(image, 0)
        print("Image loaded!")

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


if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
