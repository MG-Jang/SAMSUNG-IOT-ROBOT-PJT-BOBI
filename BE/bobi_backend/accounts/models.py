from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    user_id = models.IntegerField(primary_key=True)
    robot_id = models.ForeignKey('bobi.Robot', on_delete=models.SET_NULL, null=True)
    nickname = models.CharField(max_length=20, default='user')
    youtube_id = models.CharField(max_length=30)
    phone_number = models.IntegerField()