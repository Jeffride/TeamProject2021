from django.db import models

# Model which contains fields that are responsible for uploading the selected 
# image to the respective directory
# This is how we upload images from the admin page
class Image_Upload(models.Model): 
    name = models.CharField(max_length=50) 
    easy_img = models.ImageField(upload_to='easy/') 
    hard_img = models.ImageField(upload_to='hard/')
    retro_img = models.ImageField(upload_to='retro/', default='SOME_STRING')
