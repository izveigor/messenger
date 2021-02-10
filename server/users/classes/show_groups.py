from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User, Group
from rest_framework import status
from users.serialize import UserSerializer
from users.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions


class ShowGroups(APIView):

    authentication_classes = [TokenAuthentication]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if email is None or password is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            user = authenticate(email, password)
            if user is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            result_users = list()
            groups = Group.objects.filter(user_first=user).all()
            for group in groups:
                print(group.user_second.first_name)
                result_users.append(UserSerializer(group.user_second, many=False).data)
            return Response(result_users, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)