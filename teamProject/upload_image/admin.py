from django.contrib import admin
from django.contrib.auth.models import Group


# Register your models here.
from upload_image.models import Image_Upload

admin.site.site_header = "John is nice"

class Snippet_Image_Upload(admin.ModelAdmin):
    exclude = ("name",)


admin.site.register(Image_Upload, Snippet_Image_Upload)
