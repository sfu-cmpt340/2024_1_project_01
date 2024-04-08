# Skintector
Skintector is a web application that allows users to self-diagnose skin conditions present in their images using AI. The model is built on [EfficientNetV2M](https://arxiv.org/pdf/2104.00298.pdf) and has been fine-tuned on the [SD-198](https://paperswithcode.com/dataset/sd-198) dataset.

The front-end was built using [React](https://react.dev/), styled using [Tailwind](https://tailwindcss.com/) and [Mantine](https://mantine.dev/), uses [Dexie (IndexedDB)](https://dexie.org/) as a database, and was developed on [Vite](https://vitejs.dev/). The back-end API runs on [Flask](https://flask.palletsprojects.com/en/3.0.x/) and serves a [Tensorflow](https://www.tensorflow.org/) model.

## Video Demo
[![Skintector Demo Video](https://img.youtube.com/vi/CnpN-qIJ_VI/0.jpg)](https://www.youtube.com/watch?v=CnpN-qIJ_VI)

## Table of Contents
1. [Installation](#install)

2. [Demo](#demo)

3. [Reproducing this project](#repro)

<a name="demo"></a>

## 1. Example demo
![Demo Gif](demo.gif)

### What to find where
```bash
repository
├── /api/
    ├── /model/                         ## Saved Tensorflow model for API
    ├── /training/                      ## Code for training the model
    ├── main.py                         ## Code for the Flask API
    ├── requirements.txt                ## List of dependencies for the back-end and model training
├── /public/                            ## Static elements for the website
├── /src/                               ## Source code for the website
├── .eslintrc.cjs                       ## Config file for linting
├── .gitignore                          ## Ignores files that shouldn't be tracked 
├── .vercelignore                       ## Ignores back-end files when hosting front-end on Vercel
├── demo.gif                            ## Demo gif for readme
├── index.html                          ## Loads React code
├── LICENSE                             ## GNU AGPL 3.0 license
├── package-lock.json, package.json     ## Config files for running front-end and installing dependencies
├── postcss.config.cjs                  ## Config file for Mantine
├── README.md                           ## You are here
├── tailwind.config.js                  ## Config file for Tailwind
├── tsconfig.json, tsconfig.node.json   ## Config files for TypeScript
├── vite.config.ts                      ## Config file for Vite
```

<a name="installation"></a>

## 2. Installation
To clone the repo, use
```bash
git clone https://github.com/sfu-cmpt340/2024_1_project_01
cd 2024_1_project_01
```

### Training and evaluation
The training and evaluation scripts require [Python](https://www.python.org/) (tested on 3.11), keras, and keras_cv. Keras requires another library as its backend, which could be jax, tensorflow, or torch. Additionally, tensorflow is needed for data loading functionality.

The recommended backends for keras are [jax](https://jax.readthedocs.io/en/latest/installation.html) with CUDA support or [tensorflow](https://www.tensorflow.org/install/pip) with CUDA support. If you install jax or torch as keras backend, you also have to install tensorflow without CUDA support. Otherwise, install tensorflow as keras backend.

Both [keras](https://keras.io/getting_started/) and [keras_cv](https://keras.io/getting_started/) should be installed after installing the backend.

If you are on Linux with an Nvidia GPU, you can install the dependencies for the training scripts using
```bash
pip install -r api/training/requirements.txt
```

If you use jax or torch as keras backend, please export environment variable `KERAS_BACKEND` or edit your local config file at `~/.keras/keras.json` to configure your backend. Example:
```bash
export KERAS_BACKEND="jax"
```

It is recommended to install dependencies for both training scripts and back-end in a [Python virtual environment](https://docs.python.org/3/library/venv.html).

### Back-End
The back-end requires [Python](https://www.python.org/) (tested on 3.11), [Flask](https://flask.palletsprojects.com/en/3.0.x/installation/), and [tensorflow](https://www.tensorflow.org/install/pip). 

To install the back-end dependencies, use
```bash
pip install -r api/requirements.txt
```

### Front-End
The front-end requires the installation of [Node.js](https://nodejs.org/en) (tested on v16.17.0).

To install the front-end dependencies, use
```bash
npm install
```
The required packages will be installed to `/node_modules/`.




<a name="repro"></a>

## 3. Reproduction

### Training and evaluation
The project uses a modified version of SD-198, where every bottom caption have been cropped out to prevent corrupting features the model learns. Download it [here](https://drive.google.com/drive/folders/1TWRD0MQ_x_Uvrv1Qi8EW7y-g14upFIoG?usp=sharing) and place inside `/api/training/`.

To train one of the 6 models mentioned in the report, use
```bash
python ./api/training/train_model.py -m [model_number]
```
The model will be saved at `./api/training/models/model_[model_number].keras`

To export one of your trained models at `api/training/models` as a Tensorflow serving model, using
```bash
python ./api/training/export_serving_model.py -m [model_number]
```
The serving model will be saved at `api/training/models/model_[model_number]/`.

If you don't want to train, you can download our trained models [here](https://drive.google.com/drive/folders/1TWRD0MQ_x_Uvrv1Qi8EW7y-g14upFIoG?usp=sharing). The folder `/models/` contains the trained models `/models/model_[model_number].keras` and their corresponding serving models `/models/model_[model_number]/`.

To evaluate a model, use
```bash
python ./api/training/evaluate_model.py -m [model_number]
```

### Back-End
Our website runs Tensorflow serving model. You can use the Tensorflow serving model provided in the repo `api/model/`, or move your exported or downloaded serving model and rename to `api/model/`.

To run the back-end in development mode, use
```bash
python ./api/main.py
```
The API will be accessible at http://127.0.0.1:5000 or http://localhost:5000.

To run the back-end in a production setting, use
```bash
cd api
gunicorn 'main':app
```

...

If you're running the back-end locally, this step can be omitted. Otherwise, create a `.env` file in base directory and fill it in as follows
```shell
VITE_CLASSIFY="address_of_your_flask_server"
```

### Front-End
To run the front-end in development mode, use
```bash
npm run dev
```
The website can then be accessed at https://127.0.0.1:5173 or https://localhost:5173.

To compile the front-end and run it in production mode, use
```bash
npm run build
npm preview
```
The TypeScript code will be compiled into JavaScript and stored at `/dist/`. The website can then be accessed at https://127.0.0.1:4173 or https://localhost:4173.