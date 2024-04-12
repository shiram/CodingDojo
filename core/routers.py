from rest_framework_nested import routers
from core.user.views import UserViewSet
from core.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from core.post.viewsets import PostViewSet
from core.comment.viewsets import CommentViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
router.register(r'posts', PostViewSet, basename='posts')

posts_router = routers.NestedSimpleRouter(router, r'posts', lookup='posts')
posts_router.register(r'comments', CommentViewSet, basename='posts-comments')


urlpatterns = [
    *router.urls,
    *posts_router.urls
]