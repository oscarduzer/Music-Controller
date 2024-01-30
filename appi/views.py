from django.shortcuts import render
from rest_framework import generics
from appi.models import Room
from appi.serializers import RoomSerializer


class RoomView(generics.CreateAPIView):
    queryset=Room.objects.all()
    serializer_class=RoomSerializer