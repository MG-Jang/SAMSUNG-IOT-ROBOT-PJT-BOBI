from rest_framework.response import Response
from .models import Sensor, Robot
from rest_framework import viewsets
from .serializers import SensorSerializer, RobotSerializer

# Create your views here.
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


class RobotViewSet(viewsets.ModelViewSet):
    queryset = Robot.objects.all()
    serializer_class = RobotSerializer