from rest_framework import viewsets
from rest_framework import filters


class AbstractViewSet(viewsets.ModelViewSet):
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_on', 'updated_on']
    ordering = ['-updated_on']