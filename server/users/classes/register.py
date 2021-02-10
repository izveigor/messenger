from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from rest_framework import status
from users.serialize import UserSerializer
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token
from django.core.cache import cache


class Register(APIView):
    def post(self, request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        password = request.data.get('password')
        email = request.data.get('email')
        photo = request.data.get('photo')
        if first_name is None or last_name is None or password is None or email is None or photo is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.create(first_name=first_name, last_name=last_name,
                                       password=password, email=email, photo=photo)
            token = Token.objects.create(user=user)
            serialize = UserSerializer(user)
            return Response({**serialize.data, **{'token': token.key}}, status=status.HTTP_200_OK)
