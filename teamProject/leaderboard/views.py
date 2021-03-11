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



def leaderboard(request):
    userScores = {}
    username = request.user.username
    for user1 in Profile.objects.all():
        userScores[user1.user_name]=user1.high_score       
    dict1 = userScores
    sorted_values = sorted(dict1.values(),reverse=True) # Sort the values
    sorted_dict = {}
    for i in sorted_values:
        for k in dict1.keys():
            if dict1[k] == i and k not in sorted_dict:
                sorted_dict[k] = dict1[k]
                break
    top_three_users={k: sorted_dict[k] for k in list(sorted_dict)[:3]}
    rest={k: sorted_dict[k] for k in list(sorted_dict)[3:]}
    context={
        "users": sorted_dict.items(),
        "1rst":{k: top_three_users[k] for k in list(top_three_users)[0:1]},
        "2nd":{k: top_three_users[k] for k in list(top_three_users)[1:2]},
        "3rd":{k: top_three_users[k] for k in list(top_three_users)[2:3]},
        "rest_of_users":rest.items(),
        "number_of_users": Profile.objects.count(),
    }
    return render(request, 'leaderboard.html', context)