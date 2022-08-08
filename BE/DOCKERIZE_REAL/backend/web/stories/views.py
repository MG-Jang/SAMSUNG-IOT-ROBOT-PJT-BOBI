# from django.shortcuts import render
from rest_framework.response import Response
from .models import Story
from rest_framework.views import APIView
from .serializers import StorySerializer

# Create your views here.
class StoryListAPI(APIView):
    def get(self, request):
        queryset = Story.objects.all()
        serializer = StorySerializer(queryset, many=True)
        return Response(serializer.data)