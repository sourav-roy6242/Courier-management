# Use Python base image
FROM python:3.11-slim

# Set working directory in the container
WORKDIR /app

# Copy only requirements.txt first (to leverage Docker cache)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the Flask port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
