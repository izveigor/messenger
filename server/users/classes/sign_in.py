from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from rest_framework import status
from users.serialize import UserSerializer
from users.auth import authenticate
from rest_framework.authtoken.models import Token


class SignIn(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(email)
        print(password)
        if email is None or password is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(email=email, password=password)
        print(user)
        if user is not None:
            result = UserSerializer(user, many=False)
            token, created = Token.objects.get_or_create(user=user)
            print(token)
            print({**result.data, **{'token': token.key}})
            return Response({**result.data, **{'token': token.key}}, status=status.HTTP_200_OK)
        else:
            return Response({'token': None}, status=status.HTTP_200_OK)
