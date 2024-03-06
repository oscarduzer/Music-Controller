from django.urls import path
from .views import *
urlpatterns = [
    path('create-room',RoomView.as_view()),
    path('create',CreateRoomView.as_view())
]
