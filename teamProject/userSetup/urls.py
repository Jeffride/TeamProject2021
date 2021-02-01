from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name='landing-page'),
    path('register/',views.register, name='registration-page'),
    path('login/',views.login,name='login-page'),
]
