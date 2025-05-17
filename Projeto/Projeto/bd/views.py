from django.contrib.auth.models import User
from .models import Utilizador
from .serializers import (
    UtilizadorSerializer,
    ClubeSerializer,
    LigaSerializer,
    PostSerializer,
)
from .models import Clube, Liga, Post
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, generics
from django.utils import timezone


@api_view(["POST"])
@permission_classes([AllowAny])
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
            {"error": "Username already exists!"}, status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "This email is already being used!"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(username=username, email=email, password=password)
    Utilizador.objects.create(
        user=user,
        username=username,
        nome="",
        email=email,
        userType=0,  # User normal
        joinDate=user.date_joined,
    )
    return Response(
        {"message": "User " + user.username + " created successfully"},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
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
            {"error": "Username ou senha inválidos!"},
            status=status.HTTP_401_UNAUTHORIZED,
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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get("currentPassword")
    new_password = request.data.get("newPassword")
    confirm_password = request.data.get("confirmPassword")

    if not user.check_password(current_password):
        return Response({"error": "Senha atual incorreta."}, status=400)
    if new_password != confirm_password:
        return Response({"error": "As novas passwords não coincidem."}, status=400)
    user.set_password(new_password)
    user.save()
    return Response({"message": "Password alterada com sucesso!"})


@api_view(["GET"])
@permission_classes([IsAdminUser])
def list_users(request):
    users = Utilizador.objects.all()
    serializer = UtilizadorSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def criar_post(request):
    user = request.user

    try:
        utilizador = Utilizador.objects.get(user=user)
    except Utilizador.DoesNotExist:
        return Response(
            {"error": "Utilizador não encontrado."}, status=status.HTTP_404_NOT_FOUND
        )
        
    serializer = PostSerializer(data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save(autor=utilizador, data=timezone.now())
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def clubes_por_liga(request, liga_id):
    clubes = Clube.objects.filter(liga_id=liga_id)
    serializer = ClubeSerializer(clubes, many=True)
    return Response(serializer.data)


@api_view(["GET", "DELETE", "PUT", "PATCH"])
@permission_classes([AllowAny])
def post_view(request, post_id):
    if request.method == "DELETE":
        try:
            post = Post.objects.get(id=post_id)
            post.delete()
            return Response({"message": "Post deleted successfully"}, status=204)
        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND
            )
    if request.method == "GET":
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND
            )
        
    if request.method in ["PUT", "PATCH"]:
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = PostSerializer(post)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upvote_post(request, post_id):

    try:
        utilizador = Utilizador.objects.get(user=request.user)
        post = Post.objects.get(id=post_id)
    except (Utilizador.DoesNotExist, Post.DoesNotExist):
        return Response({"error": "Post ou utilizador não encontrado."}, status=404)

    # Se o utilizador já votou, remover upvote
    if post.upvoted_users.filter(id=utilizador.id).exists():
        post.upvoteNumber = max(0, post.upvoteNumber - 1)
        post.upvoted_users.remove(utilizador)
        post.save()
        return Response({"upvoteNumber": post.upvoteNumber, "upvoted": False}, status=200)
    # Caso contrário, adicionar upvote
    else:
        post.upvoteNumber += 1
        post.upvoted_users.add(utilizador)
        post.save()
        return Response({"upvoteNumber": post.upvoteNumber, "upvoted": True}, status=200)
    


class LigaListView(generics.ListAPIView):
    queryset = Liga.objects.all()
    serializer_class = LigaSerializer
    permission_classes = [AllowAny]


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]


class ClubeListView(generics.ListAPIView):
    queryset = Clube.objects.all()
    serializer_class = ClubeSerializer
