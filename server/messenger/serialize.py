from rest_framework import serializers
from .models import Message
from users.serialize import *


class MessageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    text = serializers.CharField(max_length=500)
    pub_date = serializers.DateTimeField("Publish date")
    user = UserSerializer(many=False, read_only=True)
    photo = serializers.CharField(max_length=100000)
