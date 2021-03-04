from django.db import models

# Hotel
class Image_Upload(models.Model): 
    name = models.CharField(max_length=50) 
    easy_img = models.ImageField(upload_to='easy/') 
    hard_img = models.ImageField(upload_to='hard/')
    retro_img = models.ImageField(upload_to='retro/', default='SOME_STRING')
