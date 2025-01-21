#!/usr/bin/env bash

set -o errexit  # Exit on error

source env/Scripts/activate

# Install dependencies
pip install -r requirements.txt

cd Backend/enrollment

# Collect static files
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate
