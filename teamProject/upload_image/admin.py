from django.contrib import admin
from django.contrib.auth.models import Group

# Register your models here.
from .models import Hotel

class SnippetHotel(admin.ModelAdmin):
    exclude = ("title", )

admin.site.register(Hotel, SnippetHotel)

