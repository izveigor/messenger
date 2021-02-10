import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from messenger.models import Message
from users.models import Group as GroupModels


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat%s' % self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        text = text_data_json["text"]
        user_id = 2
        to_user = 1
        try:
            group = Group.objects.get(
                user_first_id=user_id,
                user_second_id=to_user
            )
        except Group.DoesNotExist:
            group=None
        message=Message.objects.create(
            text=text,
            group=group,
            user_id=user_id,
            photo=None
        )
        print(message.text)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'text': message.text,
            }
        )

    def chat_message(self, event):
        text = event['text']
        self.send(text_data=json.dumps({
            'text': text
        }))