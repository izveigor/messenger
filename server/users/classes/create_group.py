from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User, Group
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from users.auth import authenticate


class CreateGroup(APIView):

    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        second_id = request.data.get("second_id")
        if second_id is None or email is None or password is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(email=email, password=password)
        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        Group.objects.get_or_create(
            user_first_id=user.id,
            user_second_id=second_id
        )
        return Response(status=status.HTTP_200_OK)