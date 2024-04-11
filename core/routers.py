from rest_framework import routers
from core.user.views import UserViewSet
from core.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from core.post.viewsets import PostViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
router.register(r'posts', PostViewSet, basename='posts')

urlpatterns = [
    *router.urls,
]