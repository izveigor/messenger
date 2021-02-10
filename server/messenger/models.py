from django.db import models
from users.models import User, Group


class Message(models.Model):
    text = models.CharField("Text", max_length=500, blank=True, null=True)
    pub_date = models.DateTimeField("Publish date", auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    photo = models.TextField('Photo', max_length=100000, blank=True, null=True)

    def __str__(self):
        return self.user

    class Meta:
        db_table = 'message'
        ordering = ['pub_date']
