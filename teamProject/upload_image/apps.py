from django.apps import AppConfig

# This configuraation is needed so we could add this app to INSTALLED_APPS in settings.py
class UploadImageConfig(AppConfig):
    name = 'upload_image'
