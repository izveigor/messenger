from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from rest_framework import status


class CheckEmail(APIView):
    def post(self, request):
        email = request.data.get('email')
        if email is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({"is_active": True}, status=status.HTTP_200_OK)
        else:
            return Response({"is_active": False}, status=status.HTTP_200_OK)
