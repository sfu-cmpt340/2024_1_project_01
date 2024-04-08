# Skintector
Skintector is a web application that allows users to self-diagnose skin conditions present in their images using AI. The model is built on [EfficientNetV2M](https://arxiv.org/pdf/2104.00298.pdf) and has been fine-tuned on the [SD-198](https://paperswithcode.com/dataset/sd-198) dataset.

The front-end was built using [React](https://react.dev/), styled using [Tailwind](https://tailwindcss.com/) and [Mantine](https://mantine.dev/), uses [Dexie (IndexedDB)](https://dexie.org/) as a database, and was developed on [Vite](https://vitejs.dev/). The back-end API runs on [Flask](https://flask.palletsprojects.com/en/3.0.x/) and serves a [Tensorflow](https://www.tensorflow.org/) model.

## Video Demo
[![Skintector Demo Video](https://img.youtube.com/vi/CnpN-qIJ_VI/0.jpg)](https://www.youtube.com/watch?v=CnpN-qIJ_VI)

## Table of Contents
1. [Demo](#demo)

2. [Installation](#installation)

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

### Back-End
The back-end requires the installation of [Python](https://www.python.org/) (tested on 3.11).

To install the back-end dependencies, use
```bash
pip install -r api/requirements.txt
```
It is recommended to install the dependencies in a [venv](https://docs.python.org/3/library/venv.html) so they will not interfere with pre-existing libraries you may already have.

### Front-End
The front-end requires the installation of [Node.js](https://nodejs.org/en) (tested on v16.17.0).

To install the front-end dependencies, use
```bash
npm install
```
The required packages will be installed to `/node_modules/`.

<a name="repro"></a>
## 3. Reproduction

### Training the Model
This step may be skipped as a pre-trained model is provided in the repo at `/api/model/`. Otherwise, our model is trained on a modified version of SD-198 which can be downloaded [here]() and placed in `/api/training/`.

...

### Back-End
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