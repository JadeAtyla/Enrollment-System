from django.apps import AppConfig
# from django.contrib.admin.apps import AdminConfig  # Just added

#  # Just added
# class RegistrarAdminConfig(AdminConfig):
#     default_site = 'app.admin.RegistrarArea'

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
