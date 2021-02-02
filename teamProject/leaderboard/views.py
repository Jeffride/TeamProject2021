from django.shortcuts import render
from django.http import HttpResponse

from .models import User

# Create your views here.

def leaderboard(request):
    number_of_users = User.objects.count()
    context = {"number_of_users":number_of_users,
                'User_list':User.objects.all(),
            }
    return render(request, 'leaderboard/leaderboard.html', context)