from django.shortcuts import render
from website.models import Record
from .serializers import RecordSerializer
from rest_framework import generics
from rest_framework import permissions, viewsets

class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
