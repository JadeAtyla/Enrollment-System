#!/usr/bin/env bash

set -o errexit  # Exit on error

# Ensure you are in the right directory (adjust path if necessary)
echo "Current directory: $(pwd)"

# If backend/enrollment exists, navigate to it
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
