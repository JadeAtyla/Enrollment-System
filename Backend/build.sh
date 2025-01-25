#!/bin/bash

set -o errexit  # Exit on error
set -o nounset  # Exit on uninitialized variable usage
set -o pipefail # Exit on error in a pipeline

# Remove the existing virtual environment if it exists
if [ -d "env" ]; then
    echo "Removing existing virtual environment..."
    rm -rf env
fi

# Navigate to the Backend directory
cd ../Backend

# Enter the Nix shell to set up the environment
echo "Entering Nix shell..."
nix-shell --run "bash -c 'python -m venv env && source env/bin/activate && pip install -r requirements.txt'"

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