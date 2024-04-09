# Skintector
Skintector is a web application that allows users to self-diagnose skin conditions present in their images using AI. The model is built on [EfficientNetV2M](https://arxiv.org/pdf/2104.00298.pdf) and has been fine-tuned on the [SD-198](https://paperswithcode.com/dataset/sd-198) dataset.

The front-end was built using [React](https://react.dev/), styled using [Tailwind](https://tailwindcss.com/) and [Mantine](https://mantine.dev/), uses [Dexie (IndexedDB)](https://dexie.org/) as a database, and was developed on [Vite](https://vitejs.dev/). The back-end API runs on [Flask](https://flask.palletsprojects.com/en/3.0.x/) and serves a [Tensorflow](https://www.tensorflow.org/) model.

This project was developed by [Jeffrey Jin](https://github.com/jeffreyjkjin), [Hui Hua (Emily) Huang](https://github.com/ehuang3h), [Long Tran](https://github.com/hlongtr), and [Albert Hong](https://github.com/07Albert).

## Table of Contents
1. [Demo](#demo)

2. [Where to find what](#directory)

2. [Installation](#install)

3. [Reproduction](#repro)

<a name="demo"></a>
## 1. Demo
This is an example of how a user can diagnose an image on our website.

![Demo Gif](demo.gif)

Watch the full demo video down below.

[![Skintector Demo Video](https://img.youtube.com/vi/CnpN-qIJ_VI/0.jpg)](https://www.youtube.com/watch?v=CnpN-qIJ_VI)

<a name="directory"></a>
## 2. What to find where
The file structure of our project is listed as follows.

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
├── vercel.json                         ## Config file for Vercel
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
The training and evaluation scripts require [Python](https://www.python.org/) (tested on 3.11), [Keras](https://keras.io/), and [KerasCV](https://keras.io/keras_cv/). Keras also requires another library for its back-end, which could be [Jax](https://jax.readthedocs.io/en/latest/notebooks/quickstart.html), [Torch](https://pytorch.org/), or [Tensorflow](https://www.tensorflow.org/). No matter what back-end is used, Tensorflow is required for data loading functionality and [Matplotlib](https://matplotlib.org/stable/users/installing/index.html) for plotting training history.

It is recommended to use Tensorflow as a back-end since it has CUDA support which will speed up training and evaluation of the models. If you choose Jax or Torch, you will have to install Tensorflow without CUDA support. 

Keras and KerasCV should both be installed after the back-end is installed.

If have chosen Jax or Torch as a back-end, please export environment variable `KERAS_BACKEND` as follows
```bash
export KERAS_BACKEND="jax"
```
or edit your local config file at `~/.keras/keras.json` to configure the back-end.

If you are on Linux with an Nvidia GPU, the dependencies for the training scripts can be installed by using
```bash
pip install -r api/training/requirements.txt
```

It is recommended to install dependencies for both training scripts and back-end in a [Python virtual environment](https://docs.python.org/3/library/venv.html).


### Back-End
The back-end requires [Python](https://www.python.org/) (tested on 3.11). 

To install the back-end dependencies, use
```bash
pip install -r api/requirements.txt
```
It is also recommended to use a venv for the back-end dependencies.

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
The project uses a modified version of SD-198, where each image has its bottom caption cropped to prevent corrupting features that the model will learn. Download the dataset [here](https://drive.google.com/drive/folders/1TWRD0MQ_x_Uvrv1Qi8EW7y-g14upFIoG?usp=sharing) and place its contents inside `/api/training/`.

To train a model, use
```bash
python ./api/training/train_model.py -m [model_number]
```
where `[model_number]` is one of the six models mentioned in the report. Once complete, the model will be saved at `api/training/models/model_[model_number].keras`.

To export one of your trained models at `api/training/models` as a Tensorflow serving model, use
```bash
python ./api/training/export_serving_model.py -m [model_number]
```
The serving model will be saved at `/api/training/models/model_[model_number]/`.

To evaluate a model, use
```bash
python ./api/training/evaluate_model.py -m [model_number]
```

### Back-End
Our website runs Tensorflow serving model. If you have trained a model as shown above, you can copy and rename the numbered model to `model.keras` and paste it in `/api/model/`. If it was a serving model, you can copy its contents from `/api/training/models/model_[model_number]/` to `/api/model/`. Alternatively, you can download any one of the pretrained models [here](https://drive.google.com/drive/folders/1hat_Rac4liLwh_HUzoZWDhmLshJaLs8_) and place its contents in `/api/model/` as well.

Then, set the current directory to api by using
```bash
cd api
```
The rest of the following commands must be run in `/api/`.

To run the back-end in development mode, use
```bash
python main.py
```
The API will be accessible at http://127.0.0.1:5000 or http://localhost:5000. Note that this is not the recommended method to run the back-end for production. 

If you're running the back-end locally, this step can be omitted. Otherwise, create a `.env` file in base directory and fill it in as follows
```shell
VITE_CLASSIFY="address_of_flask_server"
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
