#!/usr/bin/env bash

set -o errexit  # Exit on error

# Debugging: List current directory contents
echo "Current directory: $(pwd)"
echo "Listing files:"
ls -l

# Navigate to backend/enrollment if it exists
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
