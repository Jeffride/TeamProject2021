from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def home(request):
    return HttpResponse("<h1>Welcome home</h1>")

def register(request):
     return HttpResponse("<h1>Registration Page</h1>")

def login(request):
    return HttpResponse("<h1>Login Page</h1>")