from rest_framework import serializers
from .models import User, FakeUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FakeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FakeUser
        fields = '__all__'