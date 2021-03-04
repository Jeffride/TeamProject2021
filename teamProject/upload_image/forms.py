# forms.py 
from django import forms 
from upload_image.models import Image_Upload
  
class Image_Upload_Form(forms.ModelForm): 
  
    class Meta: 
        model = Image_Upload 
        fields = ['easy_img', 'hard_img', 'retro_img']

        