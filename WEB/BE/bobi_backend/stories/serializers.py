from rest_framework import serializers
from .models import Story

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story       # 사용하는 모델
        fields = '__all__'  # 포함할 필드 (모두)