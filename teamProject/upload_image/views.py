from django.http import HttpResponse 
from django.shortcuts import render, redirect 
from upload_image.forms import Image_Upload_Form, Image_Upload
  
# Create your views here. 
def image_upload_view(request):
  
    if request.method == 'POST': 
        form = Image_Upload_Form(request.POST, request.FILES) 
  
        if form.is_valid(): 
            form.save() 
            return redirect('success') 
    else: 
        form = Image_Upload_Form() 
    return render(request, 'hotel_image_form.html', {'form' : form}) 
  
  
def success(request): 
    return HttpResponse('successfully uploaded') 