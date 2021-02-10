from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User, Group
from rest_framework import status
from users.serialize import UserSerializer
from users.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from messenger.models import Message
from messenger.serialize import MessageSerializer


class GetMessages(APIView):

    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request):
        id = request.data.get("id")
        to_id= request.data.get("to_id")
        print(id, to_id)
        print(type(id), type(to_id))
        if id is None or to_id is None:
            return Response(status=status.HTTP_200_OK)
        try:
            group = Group.objects.get(
                user_first_id=int(id),
                user_second_id=to_id
            )
            messages = Message.objects.all().filter(group=group)
            serialize = MessageSerializer(messages, many=True)
            return Response(serialize.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_200_OK)