from .models import VoiceCheck
from rest_framework import viewsets
from .serializers import VoiceCheckSerializer

# Create your views here.
class VoiceCheckViewSet(viewsets.ModelViewSet):
    queryset = VoiceCheck.objects.all()
    serializer_class = VoiceCheckSerializer