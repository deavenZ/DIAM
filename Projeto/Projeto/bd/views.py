from django.contrib.auth.models import User
from .models import Utilizador
from .serializers import UtilizadorSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from rest_framework import status


@api_view(["POST"])
def register(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if username is None:
        return Response(
            {"error": "invalid username"}, status=status.HTTP_400_BAD_REQUEST
        )
    if email is None:
        return Response({"error": "invalid email"}, status=status.HTTP_400_BAD_REQUEST)
    if password is None:
        return Response(
            {"error": "invalid password"}, status=status.HTTP_400_BAD_REQUEST
        )
    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
        )
    user = User.objects.create_user(username=username, email=email, password=password)
    Utilizador.objects.create(
        user=user,
        username=username,
        nome="",
        email=email,
        userType=0,  # User normal
    )
    return Response(
        {"message": "User " + user.username + " created successfully"},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def login_view(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)  # Criação da sessão
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "message": "Logged in successfully",
                "token": token.key,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_staff": user.is_staff,
                },
            }
        )
    else:
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"message": "Logged out successfully"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response(
        {
            "username": request.user.username,
            "email": request.user.email,
            "is_staff": request.user.is_staff,
        }
    )


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def profile_view(request):
    try:
        profile = Utilizador.objects.get(user=request.user)
    except Utilizador.DoesNotExist:
        return Response(
            {"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        serializer = UtilizadorSerializer(profile)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = UtilizadorSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
