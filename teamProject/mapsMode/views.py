from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .forms import scoreForm
#from leaderboard.models import User
from django.contrib.auth.models import User
from django.shortcuts import redirect
@login_required
def main(request):
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
    return render(request,'game1.html',context)
# Create your views here.
