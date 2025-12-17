#!/bin/bash
# Azure App Service startup script for Flask application

# Install dependencies
pip install -r requirements.txt

# Run the Flask app using Gunicorn
# Azure App Service provides PORT environment variable
gunicorn --bind 0.0.0.0:8000 --workers 2 --timeout 120 --access-logfile - --error-logfile - app:app

