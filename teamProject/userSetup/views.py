from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from mapsMode.forms import scoreForm
#from leaderboard.models import User
from django.contrib.auth.models import User
from django.contrib.auth import logout
# Create your views here.


@login_required
def home(request):
    highscore = 0
    if request.method == "POST":
        form = scoreForm(request.POST)
        if form.is_valid():
            pendingForm = form.save(commit=False)
            pendingForm.user_name = request.user.username
            pendingForm.save()

            return redirect('/leaderboard')
        else:
            form = scoreForm()
    context = {'form':scoreForm}
    return render(request,'index.html',context)

def defaultpage(request):
    #return render(request,'landingPage.html')
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f"New account created: {username}")
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username,password=raw_password)
            login(request,user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request,'landingPage.html',{'form':form})

    
def register(request):
    #using the default django usercreationform
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            # create user object with score set to 0
            #user = User(user_name=username,high_score=0)
            # save the user in the django database using API
            #user.save()
            messages.success(request, f"New account created: {username}")
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username,password=raw_password)
            login(request,user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request,'register.html',{'form':form})

def signin(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                #messages.info(request, f"You are now logged in as {username}")
                return redirect('home',)
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request,"login.html",{"form":form})

@login_required
def about_us(request):
    return render(request, "about_us.html")

def logout_request(request):
    logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect("defaultpage")
# do not create a view called login, it will conflict with the django
# login function above