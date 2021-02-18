from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from mapsMode.myModules.imageListings import * 

@login_required
def main(request):
    return render(request,'game1.html',{'image':genRandomImage()})
# Create your views here.
