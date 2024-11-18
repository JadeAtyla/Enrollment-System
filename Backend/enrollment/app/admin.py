from django.contrib import admin
from .models import Account # from model.py import Account class

# Register your models here.
admin.site.register(Account) # Account model is registered to admin