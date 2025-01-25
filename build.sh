#!/bin/bash

set -o errexit  # Exit on error

# Navigate to the frontend folder and build the app
cd Frontend
npm install
npm run build

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