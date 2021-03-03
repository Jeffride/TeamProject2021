from django.contrib import admin
from django.contrib.auth.models import Group


# Register your models here.
from .models import Hotel
admin.site.site_header = "John is cool"

class SnippetHotel(admin.ModelAdmin):
    exclude = ("name",)


admin.site.register(Hotel, SnippetHotel)
