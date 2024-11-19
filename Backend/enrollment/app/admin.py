from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Program)
admin.site.register(Address)
admin.site.register(Student)
admin.site.register(Schedule)
admin.site.register(Instructor)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Grade)
admin.site.register(Permission)
admin.site.register(Role)
admin.site.register(RolePermission)


# admin.site.index_title = "Enrollment System"
# admin.site.site_header = "Enrollment System Admin"
# admin.site.site_title = "Enrollment System Admin" 

#  # Just added
# class RegistrarArea(admin.AdminSite):
#     site_header = 'Registrar Area'
# registrar = RegistrarArea(name='Registrar')
# registrar.register(Enrollment)
