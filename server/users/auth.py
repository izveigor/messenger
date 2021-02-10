from django.conf import settings
from users.models import User
import bcrypt
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher


def authenticate(email=None, password=None):
    if email is not None and password is not None:
        try:
            user = User.objects.get(email=email)
            user_password = user.password
            if user_password == password:
                return user
            else:
                return None
        except User.DoesNotExist:
            return None
    else:
        return None
