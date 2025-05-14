from django.db import models

class Liga(models.Model):
    nome = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/ligas')
    pais = models.CharField(max_length=100)

class Clube(models.Model):
    nome = models.CharField(max_length=100)
    emblema = models.ImageField(upload_to='logos/clubes')
    liga = models.ForeignKey(Liga, on_delete=models.CASCADE)

class Utilizador(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)
    favClub = models.ForeignKey(Clube, on_delete=models.SET_NULL, null=True, blank=True)
    bio = models.TextField(max_length=100, null=True, blank=True)
    userType = models.IntegerField(default=0)

class Post(models.Model):
    autor = models.ForeignKey(Utilizador, on_delete=models.CASCADE)
    data = models.DateTimeField('data de publicação')
    texto = models.TextField('post')
    clube = models.ForeignKey(Clube, on_delete=models.SET_NULL, null=True, blank=True)
    upvoteNumber = models.IntegerField(default=0)

class Comentarios(models.Model):
    autor = models.ForeignKey(Utilizador, on_delete=models.CASCADE)
    data = models.DateTimeField('data de publicação')
    texto = models.TextField('comentário')
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    likenumber = models.IntegerField(default=0)

class Votacao(models.Model):
    votacao_texto = models.CharField(max_length=100)
    data_pub = models.DateTimeField('data de publicação')

class Opcao(models.Model):
    questao = models.ForeignKey(Votacao, on_delete=models.CASCADE)
    opcao_texto = models.CharField(max_length=100)
    votos = models.IntegerField(default=0)