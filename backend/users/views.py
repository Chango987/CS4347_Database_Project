# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from django.db import connection

from .models import User, UserPortfolio, UserPortfolioActual

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
        
        sql_statement = f"""
            insert into users_user (
                email,
                password,
                first_name,
                last_name,
                date_joined,
                is_staff,
                is_active,
                is_superuser,
                id
            )
            values
                (%s, %s, %s, %s, now(), false, true, false, gen_random_uuid())
        """

        with connection.cursor() as cursor:
            cursor.execute(sql_statement, [email, password, first_name, last_name])
        connection.commit()

        return Response(status=status.HTTP_201_CREATED)
    

    # def delete(self, request, format=None):
    #     data = request.GET
    

class UserPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPortfolio
        fields = [
            "small_cap_percentage",
            "medium_cap_percentage",
            "large_cap_percentage"
        ]


class ViewUserPortfolio(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        portfolio = UserPortfolio.objects.raw("SELECT * FROM users_userportfolio WHERE user_id = %s", [user.id])[0]
        portfolio = UserPortfolioSerializer(portfolio).data

        return Response(portfolio)
    

    def post(self, request, format=None):
        user = request.user
        data = request.data

        small_cap_percentage = data['small_cap_percentage']
        medium_cap_percentage = data['medium_cap_percentage']
        large_cap_percentage = data['large_cap_percentage']
 
        sql_statement = f"""
            insert into users_userportfolio (
                user_id,
                small_cap_percentage,
                medium_cap_percentage,
                large_cap_percentage
            )
            values
                (%s, %s, %s, %s)
        """
        with connection.cursor() as cursor:
            cursor.execute(sql_statement, [user.id, small_cap_percentage, medium_cap_percentage, large_cap_percentage])

        return Response(status=status.HTTP_201_CREATED)


    def patch(self, request, format=None):
        user = request.user
        data = request.data

        small_cap_percentage = data['small_cap_percentage']
        medium_cap_percentage = data['medium_cap_percentage']
        large_cap_percentage = data['large_cap_percentage']

        sql_statement = f"""
            UPDATE users_userportfolio 
            SET small_cap_percentage = %s,
                medium_cap_percentage = %s,
                large_cap_percentage = %s
            WHERE user_id = %s
        """
        
        with connection.cursor() as cursor:
            cursor.execute(sql_statement, [small_cap_percentage, medium_cap_percentage, large_cap_percentage, user.id])

        return Response(status=status.HTTP_200_OK)
    

class ViewUserPortfolioActual(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        portfolio = UserPortfolioActual.objects.raw("SELECT * FROM users_userportfolioactual WHERE user_id = %s", [user.id])[0]
        portfolio = UserPortfolioSerializer(portfolio).data

        return Response(portfolio)
