from django.shortcuts import render
from .models import Account # imports model

# Create your views here.
def index(request):
    account = Account.objects.all() # retrive all data from the table
    context={
        'account': account # key: value
    }
    return render(request, 'index.html', context) # request, redering file, content