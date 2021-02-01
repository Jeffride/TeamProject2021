from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm


# Create your views here.

def home(request):
    return HttpResponse("<h1>Welcome home</h1>")

def register(request):
    #using the default django usercreationform
    form = UserCreationForm()
    return render(request,'register.html',{'form':form})

def login(request):
    return HttpResponse("<h1>Login Page</h1>")