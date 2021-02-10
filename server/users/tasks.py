from users.celery import app
from users.models import User
from django.core.mail import send_mail
import logging
from server import config


@app.task
def send_email_register(user_id):
    if user_id is None:
        logging.warning("Id is None!")
    try:
        user = User.objects.get(user_id = id)
        link = '123'
        send_mail(
            'Verify your account',
            'Follow this link to verify your account: '
            'http://localhost:8080/%s' % link,
            config.EMAIL,
            [user.email],
            fail_silently=False,
        )
    except User.DoesNotExist:
        logging.warning("Tried to send verification email to non-existing user '%s'" % user_id)

@app.task
def send_new_password(user_id):
    if user_id is None:
        logging.warning("Id is None")

    try:
        user = User.objects.get(id=user_id)
        link = '123'
        send_mail(
            'Change your password',
            'Follow this link to change your password: '
            'http://localhost:8080/%s' % link,
            config.EMAIL,
            [user.email],
            fail_silently=False,
        )
    except User.DoesNotExist:
        logging.warning("Tried to send verification email to non-existing user '%s'" % user_id)