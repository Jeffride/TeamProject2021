from django.shortcuts import render
from django.http import HttpResponse
 
from .models import User as Profile
from django.contrib.auth.models import User
from datetime import date

# Create your views here.

'''def leaderboard(request):
    if(User.objects.count()>3):
        leaderboard=User.objects.order_by("high_score").reverse()
        top_three_users=leaderboard[:3]
        context = {'number_of_users':User.objects.count(),
                    '1rst':top_three_users[0],
                    '2nd':top_three_users[1],
                    '3rd':top_three_users[2],
                    'rest_of_users':leaderboard[3:],
                    'today':date.today().strftime("%d/%m/%Y"),
                }
    else:
        context={'number_of_users':User.objects.count()}
    return render(request, 'leaderboard.html', context)'''
userScores = {}
for user in User.objects.all():
    for user1 in Profile.objects.all():
        if user.username == user1.user_name:
            userScores[user.username] = user1.high_score
        else:
            userScores[user.username] = "No high score yet"
            #score = user1.high_score
            #print(score)
def leaderboard(request):
    context={

        #"users": User.objects.all(),
        "users": userScores,
        #"score":userScores.values(),
        "number_of_users": User.objects.count(),
    }
    return render(request, 'leaderboard.html', context)