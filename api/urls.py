from django.urls import path
from .views import *
urlpatterns = [
    path('create-room',RoomView.as_view()),
    path('create',CreateRoomView.as_view()),
    path('join',JoinRoom.as_view()),
    path('user-in-room',UserInRoom.as_view()),
    path('room',GetRoom.as_view()),
    path('leave-room',LeaveRoom.as_view())
]
