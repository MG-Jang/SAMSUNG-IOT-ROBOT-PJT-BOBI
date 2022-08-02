from django.db import models

# Create your models here.
class Story(models.Model):
    story_id = models.IntegerField(primary_key=True)
    narr_link = models.CharField(max_length=100)
    content = models.TextField()