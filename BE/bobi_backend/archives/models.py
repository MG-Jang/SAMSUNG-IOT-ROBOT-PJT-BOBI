from django.db import models
from django.conf import settings

# Create your models here.
class Archive(models.Model):
    archive_id = models.IntegerField(primary_key=True)
    id = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='archives', db_column='user_id', on_delete=models.SET_NULL, null=True)
    img_link = models.CharField(max_length=100)
    youtube_link = models.CharField(max_length=100)
    datetime = models.DateTimeField()
    title = models.CharField(max_length=20)
    contents = models.TextField(max_length=200)