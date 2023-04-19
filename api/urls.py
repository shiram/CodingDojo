from django.urls import path
from .views import RecordViewSet

record_list = RecordViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

record_detail = RecordViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('record/', record_list, name='record-list'),
    path('record/<int:pk>', record_detail, name='record-detail'),
]