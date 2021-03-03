# forms.py 
from django import forms 
from upload_image.models import Hotel
  
class HotelForm(forms.ModelForm): 
  
    class Meta: 
        model = Hotel 
        fields = ['hotel_Main_Img', 'hotel_medium_img', 'hotel_retro_img']
        