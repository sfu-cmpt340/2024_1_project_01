from base64 import decodebytes
from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def classify() -> json:
    # get image from user
    data = request.get_json()
    image = data['image']

    # temp code that saves image sent from frontend locally
    # actual implementation should not save the image locally at all; just pass the image data
    # do not push this image to the git repo
    with open('image.jpg', 'wb') as file:
        file.write(decodebytes(bytes(image.split(',')[1], 'UTF-8')))

    # this should return a dict where the key is the condition and value is the probability
    return { 'data':  'hello world' }

if __name__ == '__main__':
    app.run(debug=True)