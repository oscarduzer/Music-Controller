from django.urls import path
from .views import index
urlpatterns = [
    path('',view=index),
    path('create/',view=index),
    path('join/',view=index),
    path('room/',view=index)
]
