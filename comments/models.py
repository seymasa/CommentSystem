from django.conf import settings
from django.db import models
# Create your models here.
from django.template.backends import django

class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=120,)
    content = models.TextField()
    publishDate = models.DateTimeField()
    def __str__(self):
        return self.title


class Comment(models.Model):
    status =models.BooleanField(default=1)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    content = models.TextField()
    publishDate = models.DateTimeField()


class CommentLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)



