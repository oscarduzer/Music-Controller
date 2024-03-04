from django.urls import path
from .views import *
urlpatterns = [
    path('create-room',RoomView.as_view())
]
