# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import authentication, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from django.db import connection

from .models import User

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name"
        ]

class ViewUsers(APIView):
    # retrieve access token to make authorized api calls
    def get(self, request, format=None):
        data = request.GET
        user = User.objects.raw('SELECT * FROM users_user WHERE email = %s', [data['email']])[0]

        if not check_password(data['password'], user.password):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # generate access token
        refresh_token = RefreshToken.for_user(user)
        user = UsersSerializer(user).data
        user['access_token'] = str(refresh_token.access_token)

        return Response(user)
    

    def post(self, request, format=None):
        data = request.data
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        password = make_password(data['password'])
        
        User.objects.create(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )
        return Response(status=status.HTTP_201_CREATED)
    

    # def delete(self, request, format=None):
    #     data = request.GET
        

