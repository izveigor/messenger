from django.test import TestCase
from users.models import User
from rest_framework.test import APITestCase
from users.serialize import UserSerializer


class TestCheckEmail(APITestCase):
    def test_email(self):
        User.objects.create(email='123@123.123', password='123',
                            first_name='123', last_name='123',
                            photo='123')
        User.objects.create(email='qwe@qwe.qwe', password='123',
                            first_name='123', last_name='123',
                            photo='123')

        data1 = {'email': '123@qwe.qwe'}
        data2 = {'email': '123@123.123'}
        data3 = {'email': 'wer@wer.wer'}
        data4 = {'email': 'qwe@qwe.qwe'}

        response1 = self.client.post('/user/check/', data1, format='json')
        response2 = self.client.post('/user/check/', data2, format='json')
        response3 = self.client.post('/user/check/', data3, format='json')
        response4 = self.client.post('/user/check/', data4, format='json')

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response4.status_code, 200)

        self.assertEqual(response1.data['is_active'], False)
        self.assertEqual(response2.data['is_active'], True)
        self.assertEqual(response3.data['is_active'], False)
        self.assertEqual(response4.data['is_active'], True)


class TestRegister(APITestCase):
    def test_register(self):
        user1 = {'email': 'qwe@qwe.qwe', 'password': '123',
                 'first_name': '123', 'last_name': '123',
                 'photo': '123'}
        user2 = {'email': '123@123.123', 'password': '123',
                 'first_name': '123', 'last_name': '123',
                 'photo': '123'}

        response1 = self.client.post('/user/register/', user1, format='json')
        response2 = self.client.post('/user/register/', user2, format='json')

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)

        user_get_1 = User.objects.get(email='qwe@qwe.qwe')
        user_get_2 = User.objects.get(email='123@123.123')

        print(response1.data['token'])

        self.assertEqual(response1.data['first_name'], user1['first_name'])
        self.assertEqual(response2.data['last_name'], user2['last_name'])

        self.assertEqual(user_get_1.email, user1['email'])
        self.assertEqual(user_get_2.photo, user2['photo'])


class SingIn(APITestCase):
    def test_sign_in(self):
        user1 = User.objects.create(email='123@123.123', password='12345',
                                    first_name='12345', last_name='12345',
                                    photo='12345')
        user2 = User.objects.create(email='asd@asd.asd', password='asd',
                                    first_name='asd', last_name='asd',
                                    photo='asd')

        post_data1 = {'email': '123@123.123', 'password': '12345'}
        post_data2 = {'email': 'asd@asd.asd', 'password': 'asd'}
        post_data3 = {'email': 'asd@asd.asd', 'password': 'qw'}
        post_data4 = {'email': 'qwe', 'password': '123'}

        response1 = self.client.post('/user/sign_in/', post_data1, format='json')
        response2 = self.client.post('/user/sign_in/', post_data2, format='json')
        response3 = self.client.post('/user/sign_in/', post_data3, format='json')
        response4 = self.client.post('/user/sign_in/', post_data4, format='json')

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response3.status_code, 400)
        self.assertEqual(response4.status_code, 400)

        self.assertEqual(response1.data['first_name'], '12345')
        self.assertEqual(response2.data['last_name'], 'asd')


class DeleteUser(APITestCase):
    def test_delete_user(self):
        user1 = {'email': '321', 'password': '321',
                 'first_name': '321', 'last_name': '321',
                 'photo': '321'}
        user2 = {'email': '21', 'password':'21',
                 'first_name': '21', 'last_name': '21',
                 'photo': '21'}

        response1 = self.client.post('/user/register/', user1, format='json')
        response2 = self.client.post('/user/register/', user2, format='json')

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)

        response3 = self.client.post('/user/delete/', {'id': 1, 'token': response1.data['token']})
        response4 = self.client.post('/user/delete/', {'id': 2, 'token': response2.data['token']})

        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response4.status_code, 200)
        
        # self.assertEqual(response3.data['is_delete'], True)
        # self.assertEqual(response4.data['is_delete'], True)
