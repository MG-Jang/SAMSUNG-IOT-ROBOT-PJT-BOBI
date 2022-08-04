from django.db import models

# Create your models here.
class Story(models.Model):
    story_id = models.IntegerField(primary_key=True)
    narr_link = models.CharField(max_length=100, null=True)
    title = models.CharField(max_length=10)
    content = models.TextField()

    def __str__(self):
        return self.story_id, self.title