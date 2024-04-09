from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404

# Create your models here.

class UserManager(BaseUserManager):

    def get_object_by_public_id(self, public_id):
        try:
            instance = self.get(public_id=public_id)
            return instance
        except (ObjectDoesNotExist, ValueError, TypeError):
            return Http404
        
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

class User(AbstractBaseUser, PermissionsMixin):

    public_id = models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True)
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = UserManager()

    def __str__(self) -> str:
        return f"{self.email}"
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

        