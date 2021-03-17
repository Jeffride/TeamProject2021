from django.db import models

# Create your models here.

class User(models.Model):
    class meta():
        proxy=True
    def __str__(self):
        return '{}, {}'.format(self.user_name, self.high_score)

    user_name = models.CharField(max_length=200)
    high_score = models.IntegerField(default=0)
    #easy_score = models.IntegerField(default=0)
    #retro_score = models.IntegerField(default=0)
    #scores = [high_score,easy_score,retro_score]
