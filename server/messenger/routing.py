from django.urls import path

from messenger import consumer

websocket_urlpatterns = [
    path('ws/chat/chat/<int:room_name>/', consumer.ChatConsumer().as_asgi())
]
