import datetime
from typing import Any
from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from core.abstract import AbstractModel, AbstractManager

# Create your models here.

class UserManager(BaseUserManager, AbstractManager):
        
    def create_user(self, username, first_name, last_name, email, password=None, **kwargs):
        """
        Create and return a user with an email, username, first name, last name and password.
        """
        if username is None:
            raise TypeError('Users must have a username.')
        if first_name is None:
            raise TypeError('Users must have a first name.')
        if last_name is None:
            raise TypeError('Users must have a last name.')
        if email is None:
            raise TypeError('Users must have an email address.')
        if password is None:
            raise TypeError('Users must have a password.')
        
        user = self.model(username=username, email=self.normalize_email(email), first_name=first_name, last_name=last_name, **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, username, first_name, last_name, email, password=None, **kwargs):
        """
        Create and return a superuser with an email, username, first name, last name and password.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if username is None:
            raise TypeError('Superusers must have a username.')
        if first_name is None:
            raise TypeError('Superusers must have a first name.')
        if last_name is None:
            raise TypeError('Superusers must have a last name.')
        if email is None:
            raise TypeError('Superusers must have an email address.')
        
        user = self.create_user(username, first_name, last_name, email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    posts_liked = models.ManyToManyField('core_post.Post', related_name='liked_by', blank=True)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = UserManager()

    def __str__(self) -> str:
        return f"{self.email}"
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
    
    def like(self, post):
        """
        Like a post
        """
        return self.posts_liked.add(post)
    
    def remove_like(self, post):
        """
        Remove like from a post
        """
        return self.posts_liked.remove(post)
    
    def has_liked(self, post):
        """
        Check if user has liked a post
        """
        return self.posts_liked.filter(pk=post.pk).exists()

        