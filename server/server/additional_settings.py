from .settings import *
from server import config

AUTH_USER_MODEL = 'users.User'

DATABASE_ROUTERS = ['messenger.router.MessageRouter', 'users.router.UserRouter']

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 25,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication'
    ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',)
}

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.Argon2PasswordHasher',
]

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

ASGI_APPLICATION = 'server.routing.application'

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'users.serialize.UserSerializer',
}

REDIS_HOST = 'localhost'
REDIS_PORT = '6587'
BROKER_URL = 'redis://' + REDIS_HOST + ':' + REDIS_PORT + '/0'
BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 3600}
CELERY_RESULT_BACKEND = 'redis://' + REDIS_HOST + ':' + REDIS_PORT + '/0'

EMAIL_USE_TLS = True
EMAIL_HOST = config.EMAIL_HOST
EMAIL_PORT = 587
EMAIL_HOST_USER = config.EMAIL
EMAIL_HOST_PASSWORD = config.PASSWORD_EMAIL

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'users',
        'USER': config.DATABASE_USERS_USER,
        'PASSWORD': config.DATABASE_USERS_PASSWORD,
        'HOST': 'localhost',
        'PORT': '8000',
    },
    'messages': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'messages',
        'USER': config.DATABASE_MESSAGES_USER,
        'PASSWORD': config.DATABASE_MESSAGES_PASSWORD,
        'HOST': 'localhost',
        'PORT': '8000',
    }
}