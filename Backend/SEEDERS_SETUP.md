# Note: Dependencies must be activated
# This takes place on this directory Enrollment-System/backend/enrollment

# Custom made db creator if the database don't exist on your device
python manage.py createdb

# Migrates database tables
python manage.py migrate

# Custom made seeders for sample data
python manage.py seed