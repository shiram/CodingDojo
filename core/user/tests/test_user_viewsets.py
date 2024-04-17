from rest_framework import status

from core.fixtures.user import user

class TestUserViewSet:
    endpoint = '/users/'

    def test_list(self, client, user):
        client.force_authenticate(user=user)
        response = client.get(self.endpoint)
        print(response.data)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_create(self, client, user):
        pass

    def test_update(self, client, user):
        pass

    def test_retrieve(self, client, user):
        pass