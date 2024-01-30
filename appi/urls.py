from django.urls import path
from .views import *

urlpatterns = [
    path('room',view=RoomView.as_view(),name='index')
]
