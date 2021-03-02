from django import forms
from leaderboard.models import User as UserProfile


class scoreForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('high_score',)


