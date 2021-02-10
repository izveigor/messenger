from django.test import TestCase
from users.models import User, Group
from users.serialize import UserSerializer, GroupSerializer
import datetime


class UserTest(TestCase):

    def test_create(self):
        User.objects.create(email='123', password='123',
                            first_name='123', last_name='123',
                            photo='12345')
        User.objects.create(email='1234', password='1234',
                            first_name='1234', last_name='1234',
                            photo='12345')
        User.objects.create(email='qwerty', password='qwerty',
                            first_name='qwerty', last_name='qwerty',
                            photo='12345')
        User.objects.create(email='Привет', password='Привет',
                            first_name='Привет', last_name='Привет',
                            photo='12345')

        user1 = User.objects.get(email='123', password='123',
                                 first_name='123', last_name='123',
                                 photo='12345')
        user2 = User.objects.get(email='1234', password='1234',
                                 first_name='1234', last_name='1234',
                                 photo='12345')
        user3 = User.objects.get(email='qwerty', password='qwerty',
                                 first_name='qwerty', last_name='qwerty',
                                 photo='12345')
        user4 = User.objects.get(email='Привет', password='Привет',
                                 first_name='Привет', last_name='Привет',
                                 photo='12345')

        self.assertNotEqual(user1, None)
        self.assertNotEqual(user2, None)
        self.assertNotEqual(user3, None)
        self.assertNotEqual(user4, None)

        self.assertEqual(user1.email, '123')
        self.assertEqual(user1.photo, '12345')
        self.assertEqual(user2.password, '1234')
        self.assertEqual(user3.first_name, 'qwerty')
        self.assertEqual(user4.last_name, 'Привет')

    def test_serialize(self):
        user1 = User.objects.create(email='qr', password='qr',
                                    first_name='qr', last_name='qr',
                                    photo='qr')
        user2 = User.objects.create(email='qw', password='qw',
                                    first_name='qw', last_name='qw',
                                    photo='qr')

        user_serializer_1 = UserSerializer(user1)
        user_serializer_2 = UserSerializer(user2)

        self.assertEqual(user_serializer_1.data['first_name'], 'qr')
        self.assertEqual(user_serializer_1.data['last_name'], 'qr')
        self.assertEqual(user_serializer_2.data['photo'], 'qr')

    def test_create_superuser(self):
        User.objects.create_superuser(email='123@123.123', password='123',
                                      first_name='123', last_name='123',
                                      photo='123')

        user = User.objects.get(email='123@123.123', password='123',
                                first_name='123', last_name='123',
                                photo='123')

        self.assertNotEqual(user, None)


class GroupTest(TestCase):

    def test_create(self):
        user1 = User.objects.create(email='Q', password='Q',
                                    first_name='Q', last_name='Q',
                                    photo='Q')
        user2 = User.objects.create(email='W', password='W',
                                    first_name='W', last_name='W',
                                    photo='W')
        user3 = User.objects.create(email='E', password='E',
                                    first_name='E', last_name='E',
                                    photo='W')
        user4 = User.objects.create(email='R', password='R',
                                    first_name='R', last_name='R',
                                    photo='R')

        Group.objects.create(user_first=user1, user_second=user2)
        Group.objects.create(user_first=user3, user_second=user4)

        group1 = Group.objects.get(user_first_id=user1.id)
        group2 = Group.objects.get(user_second=user4)

        self.assertNotEqual(group1, None)
        self.assertNotEqual(group2, None)

        self.assertEqual(group1.user_first, user1)
        self.assertEqual(group1.user_second, user2)
        self.assertEqual(group2.user_first, user3)
        self.assertEqual(group2.user_second, user4)

    def test_serialize(self):
        user1 = User.objects.create(email='Q', password='Q',
                                    first_name='Q', last_name='Q',
                                    photo='Q')
        user2 = User.objects.create(email='W', password='W',
                                    first_name='W', last_name='W',
                                    photo='W')

        group1 = Group.objects.create(user_first_id=user1.id, user_second=user2)

        group_serializer_1 = GroupSerializer(group1)

        self.assertEqual(group_serializer_1.data['user_second']['first_name'], 'W')
        self.assertEqual(group_serializer_1.data['user_first']['last_name'], 'Q')
        self.assertEqual(group_serializer_1.data['user_second']['photo'], 'W')