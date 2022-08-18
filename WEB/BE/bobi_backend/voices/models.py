from django.db import models
from django.conf import settings

# Create your models here.
class Voice(models.Model):
    voice_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='voices', db_column='user_id', on_delete=models.SET_NULL, null=True)
    datetime = models.CharField(max_length=30, null=True)
    is_checked = models.BooleanField()


class VoiceCheck(models.Model):
    datetime = models.CharField(max_length=30, null=True)
    is_checked = models.BooleanField()