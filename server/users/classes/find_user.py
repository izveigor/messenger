from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User, Group
from rest_framework import status
from users.serialize import UserSerializer
from users.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


class FindUser(APIView):
    def post(self, request):
        id = request.data.get("id")
        if id is None:
            return Response(status=status.HTTP_200_OK)
        try:
            user = User.objects.get(id=id)
            result = UserSerializer(user, many=False)
            return Response(result.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_200_OK)