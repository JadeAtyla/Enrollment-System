#!/usr/bin/env bash

# Exit on error
set -o errexit  

# Navigate to the Backend directory
cd ../Backend

# Install MySQL client development libraries
apt-get update && apt-get install -y libmysqlclient-dev

# Set MySQL client flags if necessary (adjust paths according to your system)
export MYSQLCLIENT_CFLAGS="-I/usr/include/mysql"
export MYSQLCLIENT_LDFLAGS="-L/usr/lib/mysql -lmysqlclient"

# Create and activate a Python virtual environment
python -m venv env
source env/bin/activate

# Install Python dependencies from the requirements.txt file
pip install -r requirements.txt

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Navigate to the Django project directory
cd enrollment

# Collect static files for the Django project
python manage.py collectstatic --no-input

# Apply database migrations for the Django project
python manage.py migrate
