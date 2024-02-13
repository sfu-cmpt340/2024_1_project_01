from flask import Flask
import json

app = Flask(__name__)

@app.route('/classify')
def classify() -> json:
    return { 'data':  'hello world' }

if __name__ == '__main__':
    app.run(debug=True)