from rest_framework import serializers
from core.user.models import User
from core.abstract import AbstractSerializer

class UserSerializer(AbstractSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'created_on', 'updated_on']
        read_only_fields = ['is_active', 'created_on']