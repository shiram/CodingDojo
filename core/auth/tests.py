import pytest
from rest_framework import status
from core.fixtures.user import user

class TestAuthenticationViewSet:
    endpoint = '/auth/'

    def test_login(self, client, user):
        data = {
            "email": user.email,
	        "password": "test123"
        }
        response = client.post(self.endpoint + "login/", data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['access']
        assert response.data['user']['id'] == user.public_id.hex
        assert response.data['user']['username'] == user.username
        assert response.data['user']['email'] == user.email

    @pytest.mark.django_db
    def test_register(self, client):
        data = {
            "username": "kbn107",
            "email": "kbn@gmail.com",
            "password": "test1234",
            "first_name": "Kobbie",
            "last_name": "Noine"
        }
        response = client.post(self.endpoint + "register/", data)

        assert response.status_code == status.HTTP_201_CREATED

    def test_refresh(self, client, user):
        data = {
            "email": user.email,
            "password": "test123"
        }
        response = client.post(self.endpoint + "login/", data)

        assert response.status_code == status.HTTP_200_OK

        data_refresh = {
            "refresh": response.data['refresh']
        }
        response = client.post(self.endpoint + "refresh/", data_refresh)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['access']
