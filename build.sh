#!/usr/bin/env bash

set -o errexit # Exit on error

# Activate virtual environment (optional, if used)
source env/Scripts/activate

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
