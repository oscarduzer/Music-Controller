from django.shortcuts import render

def index(Request):
    return render(Request,"frontend/index.html")
