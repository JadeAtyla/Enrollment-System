#!/bin/bash

set -o errexit  # Exit on error
set -o nounset  # Exit on uninitialized variable usage
set -o pipefail # Exit on error in a pipeline

# Remove the existing virtual environment if it exists
if [ -d "env" ]; then
    echo "Removing existing virtual environment..."
    rm -rf env
fi

# Update package list and install MySQL development libraries
echo "Installing MySQL development libraries..."
sudo apt-get update
sudo apt-get install -y default-libmysqlclient-dev

# Navigate to the Backend directory
cd ../Backend

# Create a new virtual environment
echo "Creating a new virtual environment..."
python -m venv env

# Activate the virtual environment
echo "Activating the virtual environment..."
source env/bin/activate

# Upgrade pip to the latest version
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies from requirements.txt
echo "Installing dependencies from requirements.txt..."
pip install -r requirements.txt

# Navigate to the enrollment directory
cd enrollment

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --no-input

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Start the Daphne server
echo "Starting the Daphne server..."
daphne enrollment.asgi:application