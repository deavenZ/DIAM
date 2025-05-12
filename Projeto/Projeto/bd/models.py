from django.db import models

#Não sei como fazer o utilizador porque não vou guardar a senha na base de dados
#class utilizador(models.Model): 
#    nome = models.CharField(max_length=100)
#    email = models.EmailField(max_length=100)
#    senha = models.CharField(max_length=100)
#    avatar = models.ImageField(upload_to='avatars')
#    favClub = models.ForeignKey(clube, on_delete=models.CASCADE)
#    favPlayer = models.ForeignKey(player, on_delete=models.CASCADE)    
#    bio = models.TextField(max_length=100)
#    userType = models.IntegerField(default=0)

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
    questao = model.ForeignKey(votacao, on_delete=models.CASCADE)
    opcao_texto = models.CharField(max_length=100)
    votos = models.IntegerField(default=0)

class clube(models.Model):
    nome = models.CharField(max_length=100)
    emblema = models.ImageField(upload_to='emblemas')
    liga = models.CharField(max_length=100)