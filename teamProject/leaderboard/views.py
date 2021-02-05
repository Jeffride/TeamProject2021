from django.shortcuts import render
from django.http import HttpResponse

from .models import User
from datetime import date

# Create your views here.

def leaderboard(request):
    number_of_users = User.objects.count()
    top_three = User.objects.all()[0:3] 
    rest_of_users = User.objects.all()[3::]
    today = date.today().strftime("%d/%m/%Y")
    context = {'number_of_users':number_of_users,
                'User_list':User.objects.all(),
                'top_three':top_three,
                'rest_of_users':rest_of_users,
                'today':today,
                
            }
    return render(request, 'leaderboard.html', context)