#!/usr/bin/env bash

set -o errexit  # Exit on error

# Update package lists and install dependencies
apt-get update && apt-get install -y libmysqlclient-dev

# Create and activate a virtual environment
python -m venv env
source env/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Navigate to the Django project directory
cd Backend/enrollment

# Collect static files and apply database migrations
python manage.py collectstatic --no-input
python manage.py migrate