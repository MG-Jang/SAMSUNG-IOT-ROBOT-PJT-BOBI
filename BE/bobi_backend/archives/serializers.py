from rest_framework import serializers
from .models import ArchiveImage, ArchiveVideo

class ArchiveImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchiveImage
        fields = '__all__'

class ArchiveVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchiveVideo
        fields = '__all__'

