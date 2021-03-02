from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete = models.CASCADE)

    score = models.IntegerField()


    def __str__(self):
        return self.user.username, self.score
# Create your models here.
