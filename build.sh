#!/usr/bin/env bash

set -o or errexit # Exit on error

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate