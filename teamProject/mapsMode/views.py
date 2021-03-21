from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .forms import scoreForm
from leaderboard.models import User as Profile
from django.contrib.auth.models import User
from django.shortcuts import redirect

originalScore = 0 
@login_required
def main(request):
    if request.method == "POST":
        form = scoreForm(request.POST)
        if form.is_valid():
            pendingForm = form.save(commit=False)
            pendingForm.user_name = request.user.username

            for user in Profile.objects.all():
                if user.user_name == request.user.username:
                    originalscore = user.high_score
                    if originalscore >= pendingForm.high_score:
                        pendingForm.high_score = originalscore
            pendingForm.save()
            return redirect('/leaderboard')
        else:
            form = scoreForm()
            
    context = {'form':scoreForm}
    return render(request,'game1.html',context)
# Create your views here.
