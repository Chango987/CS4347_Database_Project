from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password

from .models import User

@APIView('GET')
def user_token(request):
    if request.method != 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    data = request.GET
    try:
        user = User.objects.get(email=data['email'])
        if not check_password(data['password'], user.password):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        token = RefreshToken.for_user(user)
        user['token'] = token
        return Response(user)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)