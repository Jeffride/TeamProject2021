from django.db import models

# Create your models here.
# models.py 
class Hotel(models.Model): 
    name = models.CharField(max_length=50) 
    hotel_Main_Img = models.ImageField(upload_to='easy/') 
    hotel_medium_img = models.ImageField(upload_to='medium/')
    print("HELLO")