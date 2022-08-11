from rest_framework.response import Response
from .models import Sensor
from rest_framework import viewsets
from .serializers import SensorSerializer

# Create your views here.
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer