from rest_framework import serializers

class AbstractSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source='public_id', read_only=True, format='hex')
    created_on = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    updated_on = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)