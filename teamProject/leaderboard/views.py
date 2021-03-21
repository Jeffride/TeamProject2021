from django.shortcuts import render
from django.http import HttpResponse
 
from .models import User as Profile
from django.contrib.auth.models import User
from datetime import date

from django.contrib.auth.decorators import login_required
# Create your views here.
'''
    - userScores = dictionary to store each database users name and score. This allows me to loop through later and display the name and score of each user.
    - sorted_values = convert userScores from a dictionary of sorted scores. But this lacks the usernames attached to each score.
    - sorted_dict = is a completely sorted dictionary sorted on highscore with each key being a username and value being thier score.
    - top_three = dictionary containing the top three users based on the sorted_dict.
    - rest = dictionary of all users outside the top three.
    - first = dictionary containing key(username):value(high_score) for the top user.
    - second, third = same as first but for the second and third placed user.
'''
@login_required
def leaderboard(request):
    userScores = {}
    username = request.user.username
    for user1 in Profile.objects.all():
        userScores[user1.user_name]=user1.high_score       
    dict1 = userScores
    sorted_values = sorted(dict1.values(),reverse=True) #Sort the values
    sorted_dict = {}
    for i in sorted_values:
        for k in dict1.keys():
            if dict1[k] == i and k not in sorted_dict:
                sorted_dict[k] = dict1[k]
                break
    top_three_users={k: sorted_dict[k] for k in list(sorted_dict)[:3]}
    rest={k: sorted_dict[k] for k in list(sorted_dict)[3:]}
    first={k: top_three_users[k] for k in list(top_three_users)[0:1]}
    second={k: top_three_users[k] for k in list(top_three_users)[1:2]}
    third={k: top_three_users[k] for k in list(top_three_users)[2:3]}
    context={
        "users": sorted_dict.items(),
        "1rst": first.items(),
        "2nd": second.items(),
        "3rd": third.items(),
        "rest_of_users":rest.items(),
        "len_rest": len(rest.items()),
        "number_of_users": Profile.objects.count(),
    }
    return render(request, 'leaderboard.html', context)