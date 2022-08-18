from django.shortcuts import render
from .models import Movement
from rest_framework import viewsets
from .serializers import MovementSerializer

# Create your views here.
class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer