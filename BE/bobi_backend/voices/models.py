from django.db import models
from django.conf import settings

# Create your models here.
class Voice(models.Model):
    voice_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='voices', db_column='user_id', on_delete=models.SET_NULL, null=True)
    voice_link = models.CharField(max_length=100)   # S3에서 불러올 링크
    user_send = models.BooleanField()
    is_checked = models.BooleanField()