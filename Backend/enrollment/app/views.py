from django.shortcuts import render
# from model.py import model classes
from .models import Address, Course, Enrollment, Grade, Instructor, Permission, Program, Role, RolePermission, Schedule, Student, User
from django.http import JsonResponse # for Json responses

# # Create your views here to render in the frontend.
# def index(request):
#     account = Account.objects.all() # retrive all data from the table
#     context={
#         'account': account # key: value
#     }
#     return render(request, 'index.html', context) # request, redering file, content (for html ready)

# Retrieve data in JSON format
def data(request):
    enrollment = Enrollment.objects.all().values()  # Retrieve all data as a dictionary
    return JsonResponse(list(enrollment), safe=False)  # Convert to JSON and return