
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CoreRoot.settings')
application = get_wsgi_application()

from core.user.models import User

def test_user_create():
    data_user = {
        "email": "don@test.com",
        "username": "don176",
        "password": "staff123",
        "first_name": "Don",
        "last_name": "Lasman"
    }

    user = User.objects.create_user(**data_user)
    assert user.email == data_user["email"]
    assert user.username == data_user["username"]

    return user

if __name__ == "__main__":
    user = test_user_create()
    print(user.name)
    print(user.password)