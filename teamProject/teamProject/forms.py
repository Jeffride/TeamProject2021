from django import forms
from .models import UserProfile


class scoreForm():
    class Meta:
        model = UserProfile
        fields = ('score')


