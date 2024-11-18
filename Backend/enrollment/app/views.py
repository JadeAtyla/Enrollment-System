from django.shortcuts import render
from .models import Account # from model.py import Account class
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
    accounts = Account.objects.all().values()  # Retrieve all data as a dictionary
    return JsonResponse(list(accounts), safe=False)  # Convert to JSON and return