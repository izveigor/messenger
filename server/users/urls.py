from django.urls import path, include
from rest_framework import routers
from.views import *

urlpatterns = [
    path("check/", CheckEmail.as_view(), name="check"),
    path("register/", Register.as_view(), name="register"),
    path('sign_in/', SignIn.as_view(), name='sign_in'),
    path('delete/', DeleteUser.as_view(), name='delete'),
    path('show_groups/', ShowGroups.as_view(), name='show_groups'),
    path('find_user/', FindUser.as_view(), name='find_user'),
    path('create_group/', CreateGroup.as_view(), name='create_group'),
    path('log_out/', LogOut.as_view(), name='log_out'),
]
