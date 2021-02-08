from django.shortcuts import render
from django.http import HttpResponse

from .models import User
from datetime import date

# Create your views here.

def leaderboard(request):
    leaderboard=User.objects.order_by("high_score").reverse()
    top_three_users=leaderboard[:3]
    context = {'number_of_users':User.objects.count(),
                '1rst':top_three_users[0],
                '2nd':top_three_users[1],
                '3rd':top_three_users[2],
                'rest_of_users':leaderboard[3:],
                'today':date.today().strftime("%d/%m/%Y"),
            }
    return render(request, 'leaderboard.html', context)