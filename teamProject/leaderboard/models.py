from django.db import models

# Create your models here.
'''
    User model to store the username and score.
    - user_name = when a user registers the username they enter is used in the model.
    - high_score = automatically set to 0. Updated when the user plays a game mode.
'''
class User(models.Model):
    class meta():
        proxy=True
    def __str__(self):
        return '{}, {}'.format(self.user_name, self.high_score)

    user_name = models.CharField(max_length=200)
    high_score = models.IntegerField(default=0)