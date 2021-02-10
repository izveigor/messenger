from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager


class ManagerUser(BaseUserManager):
    @staticmethod
    def check_data(email, password, first_name, last_name, photo):
        if not email:
            raise ValueError("Superuser must have an email address!")
        if not password:
            raise ValueError("Superuser must have a password!")
        if not first_name:
            raise ValueError("Superuser must have a first_name!")
        if not last_name:
            raise ValueError("Superuser must have a last_name!")
        if not photo:
            raise ValueError("Superuser must have a photo!")

    def create_user(self, email, password, first_name, last_name,
                    photo, is_active=False, is_staff=False, is_superuser=False):
        self.check_data(email=email, password=password, first_name=first_name,
                        last_name=last_name, photo=photo)

        user = self.model(
            email=self.normalize_email(email),
            photo=photo,
            is_active=is_active,
            is_staff=is_staff,
            is_superuser=is_superuser,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.save(using=self._db)
        return user

    def create_superuser(self, photo, password, email,
                         first_name, last_name,
                         ):

        self.check_data(email=email, password=password, first_name=first_name,
                        last_name=last_name, photo=photo)

        user = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            is_active=True,
            is_staff=True,
            is_superuser=True,
            photo=photo
        )
        user.save(using=self._db)
        return user

    def create(self, email, password, first_name, last_name,
               photo):

        self.check_data(email=email, password=password, first_name=first_name,
                        last_name=last_name, photo=photo)

        user = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            is_active=False,
            is_staff=False,
            is_superuser=False,
            photo=photo
        )
        user.save(using=self._db)
        return user


class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    last_visit = models.DateTimeField('Last visit', auto_now_add=True)
    photo = models.TextField('Photo', max_length=10000)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'photo']

    objects = ManagerUser()

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'user'


class Group(models.Model):
    user_first = models.ForeignKey(User, on_delete=models.CASCADE, related_name='first')
    user_second = models.ForeignKey(User, on_delete=models.CASCADE, related_name='second')

    def __str__(self):
        return self.user_first

    class Meta:
        db_table = 'group'
