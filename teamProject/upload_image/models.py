from django.db import models

class Hotel(models.Model): 
    name = models.CharField(max_length=50) 
    hotel_Main_Img = models.ImageField(upload_to='easy/') 
    hotel_medium_img = models.ImageField(upload_to='hard/')
    hotel_retro_img = models.ImageField(upload_to='retro/', default='SOME_STRING')
