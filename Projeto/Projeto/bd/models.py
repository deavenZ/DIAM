from django.db import models

class clube(models.Model):
    nome = models.CharField(max_length=100)
    emblema = models.ImageField(upload_to='logos/clubes')
    liga = models.CharField(max_length=100)

class liga(models.Model):
    nome = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/ligas')
    pais = models.CharField(max_length=100)

class utilizador(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)
    favClub = models.ForeignKey(clube, on_delete=models.CASCADE, null=True, blank=True)
    bio = models.TextField(max_length=100, null=True, blank=True)
    userType = models.IntegerField(default=0)

class post(models.Model):
    autor = models.ForeignKey(utilizador, on_delete=models.CASCADE)
    data = models.DateTimeField('data de publicação')
    texto = models.TextField('post')
    clube = models.ForeignKey(clube, on_delete=models.CASCADE)
    upvoteNumber = models.IntegerField(default=0)

class comentarios(models.Model):
    autor = models.ForeignKey(utilizador, on_delete=models.CASCADE)
    data = models.DateTimeField('data de publicação')
    texto = models.TextField('comentário')
    post = models.ForeignKey(post, on_delete=models.CASCADE)
    likenumber = models.IntegerField(default=0)

class votacao(models.Model):
    votacao_texto = models.CharField(max_length=100)
    data_pub = models.DateTimeField('data de publicação')

class opcao(models.Model):
    questao = models.ForeignKey(votacao, on_delete=models.CASCADE)
    opcao_texto = models.CharField(max_length=100)
    votos = models.IntegerField(default=0)