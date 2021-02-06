from django.shortcuts import render
from django.http import HttpResponse

from .models import User
from datetime import date

# Create your views here.

def leaderboard(request):
    context = {'number_of_users':User.objects.count(),
                'User_list':User.objects.all(),
                'today':date.today().strftime("%d/%m/%Y"),
                
            }
    return render(request, 'leaderboard.html', context)