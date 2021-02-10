from django.urls import path
from users.confirm.views_verify import change_password, verify_email


urlpatterns = [
    path("check/email/<str:url_string>", verify_email, name="verify_email"),
    path("change/password/<str:url_string>", change_password, name="change_password"),
]
