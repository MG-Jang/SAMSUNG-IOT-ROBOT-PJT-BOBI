from rest_framework import serializers
from .models import VoiceCheck

class VoiceCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceCheck
        fields = '__all__'