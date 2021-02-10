from django.test import TestCase
from messenger.models import Message
from users.models import User, Group
from messenger.serialize import *
from users.serialize import *


class TestMessageCreate(TestCase):

    def test_create(self):
        user1 = User.objects.create(email='1', password='1',
                                    first_name='1', last_name='1')
        user2 = User.objects.create(email='2', password='2',
                                    first_name='2', last_name='2')
        user3 = User.objects.create(email='3', password='3',
                                    first_name='3', last_name='3')
        user4 = User.objects.create(email='4', password='4',
                                    first_name='4', last_name='4')

        group1 = Group.objects.create(user_first=user1, user_second=user2)
        group2 = Group.objects.create(user_first=user3, user_second=user4)

        message1 = Message.objects.create(user=user1, group=group1,
                                          text='1234567890')

        message2 = Message.objects.create(user=user2, group=group1,
                                          text='0', photo='12345')

        message3 = Message.objects.create(user=user3, group=group2,
                                          text='1234567890', video='12345')

        message4 = Message.objects.create(user=user4, group=group2,
                                          text='1234567890', photo='123', video='123')

        self.assertEqual(message1.text, '1234567890')
        self.assertEqual(message1.photo, None)
        self.assertEqual(message2.user, user2)
        self.assertEqual(message3.group, group2)
        self.assertEqual(message4.video, '123')
        self.assertEqual(message4.photo, '123')
        self.assertEqual(message4.text, '1234567890')

    def serialize(self):
        user1 = User.objects.create(email='1', password='1',
                                    first_name='1', last_name='1')

        user2 = User.objects.create(email='2', password='2',
                                    first_name='2', last_name='2')

        group1 = Group.objects.create(user_first=user1, user_second=user2)

        message1 = Message.objects.create(user=user1, group=group1,
                                          text='1234567890')

        message2 = Message.objects.create(user=user1, group=group1,
                                          text='0', photo='12345')

        user_serialize = UserSerializer(user1)
        group_serialize = GroupSerializer(group1)

        message_serialize_1 = MessageSerializer(message1)
        message_serialize_2 = MessageSerializer(message2)

        self.assertEqual(message_serialize_1.data['text'], '1234567890')
        self.assertEqual(message_serialize_1.data['user'], user_serialize)
        self.assertEqual(message_serialize_2.data['photo'], '12345')
        self.assertEqual(message_serialize_2.data['group'], group_serialize)