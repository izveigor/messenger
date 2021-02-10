from rest_framework import serializers
from .models import User, Group


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    last_visit = serializers.DateTimeField()
    photo = serializers.CharField(max_length=10000)


class GroupSerializer(serializers.Serializer):
    user_first = UserSerializer(many=False, read_only=True)
    user_second = UserSerializer(many=False, read_only=True)
