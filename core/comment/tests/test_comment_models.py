import pytest

from core.fixtures.user import user # type: ignore
from core.fixtures.post import post # type: ignore
from core.comment.models import Comment

@pytest.mark.django_db
def test_create_comment(user, post):
    comment = Comment.objects.create(
        author=user,
        post=post,
        body='This is a comment'
    )

    assert comment.author == user
    assert comment.post == post
    assert comment.body == 'This is a comment'
