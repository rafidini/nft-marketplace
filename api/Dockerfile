# Import python 3.8 from DockerHub
FROM python:3.8-buster

# Define the application directory
WORKDIR /

# Copy the file to the Docker image
COPY requirements.txt .

# Run the command to install python packages
RUN pip install -r requirements.txt

# Copy the application repository in the Docker image
COPY / .

# Run server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]