from django.db import models

# Create your models here.
class Account(models.Model):
    username = models.CharField(primary_key=True, max_length=55)
    password = models.CharField(max_length=55)

    class Meta:
        managed = False
        db_table = 'account'