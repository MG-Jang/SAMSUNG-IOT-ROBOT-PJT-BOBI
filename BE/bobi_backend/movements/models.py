from django.db import models

# Create your models here.
class Movement(models.Model):
    move_id = models.IntegerField(primary_key=True)
    move_link = models.CharField(max_length=100)
    move_name = models.CharField(max_length=20)