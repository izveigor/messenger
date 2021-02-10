from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


class InputEmail(APIView):
    def post(self, request):
        email = request.data.get("email")
        if email is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            User.objects.get(email=email)
            # celery django
        except User.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    def post(self, request):
        password = request.data.get("password")
        id = request.data.get("id")
        if password is None or id is None:
            return Response(status)