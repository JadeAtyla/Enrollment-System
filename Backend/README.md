# Put you backend codes here
pipenv install django djangorestframework
pipenv install django-cors-headers
pipenv install djangorestframework-simplejwt
pipenv install pymongo
pipenv install python-dotenv

# NOTE: must run this to use dependencies installed for backend
pipenv shell # to activate enviroment

# If hosted database will be use change this in .env
DB_HOST=briaraujvkkiast9gz9o-mysql.services.clever-cloud.com
DB_NAME=briaraujvkkiast9gz9o
DB_USER=uczowlxwiez7ujzc
DB_PORT=3306
DB_PASS=fKl3OAtNoiwOAIT7Z933
DB_URI=mysql://uczowlxwiez7ujzc:fKl3OAtNoiwOAIT7Z933@briaraujvkkiast9gz9o-mysql.services.clever-cloud.com:3306/briaraujvkkiast9gz9o
SECRET_KEY=django-insecure-rc0ljpof7owdbfd2ic_6f&bq=)2p65r^8af7vyawf^3-*!(9k0