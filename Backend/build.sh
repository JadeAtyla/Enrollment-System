#!/bin/bash

set -o errexit  # Exit on error

# Install MySQL development libraries (for Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y default-libmysqlclient-dev

cd ../Backend

# Create a virtual environment (if not already created)
python -m venv env

# Activate the virtual environment
source env/bin/activate

# Install dependencies
pip install -r requirements.txt

cd enrollment

# Collect static files
python manage.py collectstatic --no-input
# Apply database migrations
python manage.py migrate

daphne enrollment.asgi:application