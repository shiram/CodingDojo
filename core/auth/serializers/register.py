from rest_framework import serializers
from core.user.serializers import UserSerializer
from core.user.models import User

class RegisterSerializer(UserSerializer):
    """
    Registration serializer for requests and user creation.
    """

    #password is atleast 8 characters long and no longer than 128 and cant ve read by user
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)

    class Meta:
        model = User

        #List all the fields that can be included in a request or a response
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        #use the create_user method defined in UserManager
        return User.objects.create_user(**validated_data)