from django.urls import path
from messenger.views import GetMessages


urlpatterns = [
    path('get_messages/', GetMessages.as_view(), name="get_messages"),
]
