# SFU CMPT 340 Project 1: Skintector
In this project, we trained 6 classification models on SD-198, a dataset consisted of 6584 images of 198 skin diseases. The base model is EfficientNetV2M pretrained on ImageNet. We built and hosted a web application that leverages the best model.

## Important Links

| [Timesheet](https://1sfu-my.sharepoint.com/:x:/g/personal/hamarneh_sfu_ca/Ef9MXVyB76BCtVh-wMX5G44BUwr7B8rmr2NsSGYwqzJrCA?e=eBwpuA) | [Slack channel](https://sfucmpt340spring2024.slack.com/archives/C06EBKQTX8R) | [Project report](https://www.overleaf.com/9885184864hycqjvxrfhjh#4ba852) |
|-----------|---------------|-------------------------|


- Timesheet: Link your timesheet (pinned in your project's Slack channel) where you track per student the time and tasks completed/participated for this project/
- Slack channel: Link your private Slack project channel.
- Project report: Link your Overleaf project report document.


## Video/demo/GIF
Record a short video (1:40 - 2 minutes maximum) or gif or a simple screen recording or even using PowerPoint with audio or with text, showcasing your work.


## Table of Contents
1. [Installation](#install)

2. [Demo](#demo)

3. [Reproducing this project](#repro)

4. [Guidance](#guide)

<a name="install"></a>

## 1. Installation
a. Download NPM at [official Node.js website](https://nodejs.org/en). <br>
b. Download Python version 3.11 at [official Python website](https://www.python.org/). <br>
c. Install required NPM packages
```bash
npm install
```
d. Create a new Python virtual environment
```bash
python3 -m venv venv
```
c. Activate the virtual environment 
```bash
source venv/bin/activate
```
d. Install packages required to run the model
```bash
pip install -r api/requirements.txt
```

<a name="demo"></a>

## 2. Demo
a. Download the model at [Google Drive link]() <br>
b. Run the website in developer mode
```bash
npm run dev
```
c. Start the Flask server in another terminal
```bash
python3 ./api/main.py
```

### Directory Structure

```bash
repository
├── /api/                               
    ├── /model/                         ## Contains the Tensorflow serving model
    ├── /training/                      ## Contains the training scripts and the dataset
    ├── main.py                         ## Contains code for the Flask server
    ├── requirements.txt                ## Contains dependencies for Tkinter app and Flask server
├── /dist/                              ## Compiled code for the website in JavaScript
├── /node_modules/                      ## Contains the packages for the project
├── /public/                            ## Contains images and information on each condition
├── /src/                               ## Source code for the website in TypeScript
    ├── /classes/                                 
    ├── /components/                    
    ├── /pages/                         
    ├── /styles.css                     
    ├── main.tsx                                   
├── index.html                          ## Loads code for React components
├── package.json, package-lock.json     ## Used for automatically installing packages from npm
├── tsconfig.json, tsconfig.node.json   ## Configuration files for TypeScript
```

<a name="repro"></a>

## 3. Reproducing this project
Download the dataset at [Google Drive link]()

Jyputer notebook `./api/training/train_model_{i}.ipynb` contains the code to train and evaluate the i<sup>th</sup> model, specifically the code in the third section "Train the model with both train and validation"

Each notebook contains training progress of one of the final model's previous training run (except for notebook 3, whose training progress output was accidentally cleared). You can see the model's performance on the test set in the last code block.

Jyputer notebook `./api/training/export_serving_mode.ipynb` contains the code to export each of the model to Tensorflow serving model for inference.

<a name="guide"></a>
## Guidance

- Use [git](https://git-scm.com/book/en/v2)
    - Do NOT use history re-editing (rebase)
    - Commit messages should be informative:
        - No: 'this should fix it', 'bump' commit messages
        - Yes: 'Resolve invalid API call in updating X'
    - Do NOT include IDE folders (.idea), or hidden files. Update your .gitignore where needed.
    - Do NOT use the repository to upload data
- Use [VSCode](https://code.visualstudio.com/) or a similarly powerful IDE
- Use [Copilot for free](https://dev.to/twizelissa/how-to-enable-github-copilot-for-free-as-student-4kal)
- Sign up for [GitHub Education](https://education.github.com/) 
