#!/usr/bin/env bash

set -o errexit  # Exit on error

# Create a virtual environment (if not already created)
python -m venv env

# Activate the virtual environment
source env/bin/activate

pip install -r requirements.txt

cd Backend/enrollment

python manage.py collectstatic --no-input
python manage.py migrate
