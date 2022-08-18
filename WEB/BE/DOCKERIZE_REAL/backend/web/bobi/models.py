from django.db import models
from django.conf import settings

# # Create your models here.
class Robot(models.Model):
    robot_id = models.IntegerField(primary_key=True)    # pk overriding
    level = models.ForeignKey('Level', related_name='robots', db_column='level', on_delete=models.SET_NULL, null=True)
    exp = models.IntegerField()
    
class Level(models.Model):
    level = models.IntegerField(primary_key=True)
    required_exp = models.IntegerField()

class Sensor(models.Model):
    sensor_id = models.IntegerField(primary_key=True)
    robot_id = models.ForeignKey('Robot', related_name='sensors', db_column='robot_id', on_delete=models.SET_NULL, null=True)
    gas = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    datetime = models.DateTimeField()
    battery = models.FloatField()