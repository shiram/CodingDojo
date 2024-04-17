import pytest

from core.fixtures.user import user # type: ignore
from core.post.models import Post

@pytest.mark.django_db
def test_create_post(user):
    post = Post.objects.create(author=user, body="test a post creation")
    assert post.author == user
    assert post.body == "test a post creation"
