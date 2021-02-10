Messenger
=================
A program is an example of messenger.
# Start
You have to complete a few steps to use the messenger
Messenger has written by Python and framework django, so you need to set up django project to run it.
## Server
Firstly, you should install django, celery and rest_framework: 
```
$ pip install django
$ pip install Celery
$ pip install rest_framework
```
### Databases
After that, you should set up your databases. In the application, I used two databases: 
first for users and second for messages. I used PostgreSQL, but you can use other bases.
You should change fields "USER" and "PASSWORD" to start application:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'users',
        'USER': 'secret',
        'PASSWORD': 'secret',
        'HOST': 'localhost',
        'PORT': '8000',
    },
    'messages': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'messages',
        'USER': 'secret',
        'PASSWORD': 'secret',
        'HOST': 'localhost',
        'PORT': '8000',
    }
}
```
and migrate:
```
$ python manage.py migrate
```
### Run
To run the server of messenger, you should write this command:
```
$ python manage.py runserver 127.0.0.1:8080
```
After that the server started to work.

If they have questions about running server or/and databases, you should visit the official documentation django https://www.djangoproject.com/.
## Application
The application has written by React Native, so you may start the application on Android or IOS.
I used expo, so you can run the application on everywhere, for it you should write the command in the folder application:
```
$ expo start
```
After that, you would see a website with url http://localhost:19002/, where would be the options of Expo. Change a tunnel, if you want to connect to the application with a network. Copy your QR-code with a mobile application "Expo" and you can use the application.

If you have questions about Expo and React native, you should visit their websites:
https://expo.io/ - a website of Expo;
https://reactnative.dev/ - a website of React Native;

After setting up the server and the application of the project, it can be used by you.
