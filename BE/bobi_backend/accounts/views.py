from rest_framework.response import Response
from .models import User, FakeUser
from rest_framework import viewsets
from .serializers import UserSerializer, FakeUserSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class FakeUserViewSet(viewsets.ModelViewSet):
    queryset = FakeUser.objects.all()
    serializer_class = FakeUserSerializer