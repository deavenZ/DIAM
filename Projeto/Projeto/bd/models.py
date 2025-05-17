from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Liga(models.Model):
    nome = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="logos/ligas")
    pais = models.CharField(max_length=100)


class Clube(models.Model):
    nome = models.CharField(max_length=100)
    emblema = models.ImageField(upload_to="logos/clubes")
    liga = models.ForeignKey(Liga, on_delete=models.CASCADE)


class Utilizador(models.Model):
    TIPO_UTILIZADOR = (
        (0, "Utilizador Normal"),
        (1, "Moderador"),
        (2, "Administrador"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, null=True, blank=True)
    nome = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    avatar = models.ImageField(
        upload_to="avatars",
        default="avatars/default_avatar.png",
    )
    bio = models.TextField(max_length=1000, null=True, blank=True)
    userType = models.IntegerField(choices=TIPO_UTILIZADOR, default=0)
    favClub = models.ForeignKey(Clube, on_delete=models.SET_NULL, null=True, blank=True)
    joinDate = models.DateTimeField("joinDate", default=timezone.now)


class Post(models.Model):
    autor = models.ForeignKey(Utilizador, on_delete=models.CASCADE)
    data = models.DateTimeField("data de publicação")
    titulo = models.CharField(max_length=100, default="Título")
    texto = models.TextField(max_length=2000, null=True, blank=True)
    imagem = models.ImageField(upload_to="posts", null=True, blank=True)
    liga = models.ForeignKey(Liga, on_delete=models.SET_NULL, null=True, blank=True)
    clube = models.ForeignKey(Clube, on_delete=models.SET_NULL, null=True, blank=True)
    upvoteNumber = models.IntegerField(default=0)
    upvoted_users = models.ManyToManyField(Utilizador, related_name="upvoted_posts", blank=True)


class Comentarios(models.Model):
    autor = models.ForeignKey(Utilizador, on_delete=models.CASCADE)
    data = models.DateTimeField("data de publicação")
    texto = models.TextField("comentário")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    likenumber = models.IntegerField(default=0)


class Votacao(models.Model):
    votacao_texto = models.CharField(max_length=100)
    data_pub = models.DateTimeField("data de publicação")


class Opcao(models.Model):
    questao = models.ForeignKey(Votacao, on_delete=models.CASCADE)
    opcao_texto = models.CharField(max_length=100)
    votos = models.IntegerField(default=0)
