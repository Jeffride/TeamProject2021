from django.shortcuts import render
from django.http import HttpResponse

from .models import User
from datetime import date

# Create your views here.

def leaderboard(request):
    top_three_users=User.objects.all()[:3]
    context = {'number_of_users':User.objects.count(),
                'rest_of_users':User.objects.all()[3:],
                '1rst':top_three_users[0],
                '2nd':top_three_users[1],
                '3rd':top_three_users[2],
                'today':date.today().strftime("%d/%m/%Y"),
            }
    return render(request, 'leaderboard.html', context)