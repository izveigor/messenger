from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from users.auth import authenticate


class DeleteUser(APIView):

    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if email is None or password is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(email=email, password=password)
        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response({'is_delete': True}, status=status.HTTP_200_OK)
