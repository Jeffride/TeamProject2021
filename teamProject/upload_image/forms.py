# forms.py 
from django import forms 
from upload_image.models import Image_Upload
  
# Form which holds the 3 fields as one 
class Image_Upload_Form(forms.ModelForm): 
  
    class Meta: 
        model = Image_Upload 
        fields = ['easy_img', 'hard_img', 'retro_img']

        