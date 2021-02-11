# forms.py 
from django import forms 
from upload_image.models import Hotel
  
class HotelForm(forms.ModelForm): 
  
    class Meta: 
        model = Hotel 
        #fields = ['name', 'hotel_Main_Img']
        fields = ['hotel_Main_Img']