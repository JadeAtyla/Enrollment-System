#!/usr/bin/env bash

set -o errexit  # Exit on error

# Create a virtual environment (if not already created)
python -m venv env

# Activate the virtual environment
source env/bin/activate

# Navigate to the correct directory
if [ -d "backend/enrollment" ]; then
  cd backend/enrollment
else
  echo "Directory backend/enrollment does not exist. Exiting."
  exit 1
fi

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate