from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    # id, username은 AbstractUser default값 사용
    robot_id = models.ForeignKey('bobi.Robot', on_delete=models.SET_NULL, null=True)
    youtube_id = models.CharField(max_length=30, null=True)
    phone_number = models.IntegerField(null=True)


class FakeUser(models.Model):
    robot_id = models.ForeignKey('bobi.Robot', on_delete=models.SET_NULL, db_column='robot_id', null=True)
    username = models.CharField(max_length=10)
    email = models.CharField(max_length=50)
    youtube_id = models.CharField(max_length=30, null=True)
    nickname = models.CharField(max_length=10, null=True)
