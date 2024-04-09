# Use an official lightweight Python image.
FROM python:3.11-slim

# Set environment variables.
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP main.py
ENV FLASK_RUN_HOST 0.0.0.0

# Set the working directory.
WORKDIR /app

# Install Python dependencies.
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application's code to the working directory.
COPY . .

# Run Gunicorn server with one worker for each core available, replace 'main:app' with your application's entry point.
CMD ["gunicorn", "--workers=2", "--bind", "0.0.0.0:5000", "main:app"]
