from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required

# Create your views here.


@login_required
def home(request):
    return HttpResponse("<h1>Succesful log in</h1>")

def defaultpage(request):
    return HttpResponse("<h1>Landing Page</h1>")
    
def register(request):
    #using the default django usercreationform
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username,password=raw_password)
            login(request,user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request,'register.html',{'form':form})

def signin(request):
    return render(request,'login.html')

# do not create a view called login, it will conflict with the django
# login function above