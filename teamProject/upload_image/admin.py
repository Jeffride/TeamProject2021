from django.contrib import admin
from django.contrib.auth.models import Group

from upload_image.models import Image_Upload

# This is where you configure the administration page
# You can change the name of the page
# I have excluded the name field as it is unnecessary
# Finally i registered the model to the admin page along with the updated class
admin.site.site_header = "Administration Page"

class Snippet_Image_Upload(admin.ModelAdmin):
    exclude = ("name",)


admin.site.register(Image_Upload, Snippet_Image_Upload)
