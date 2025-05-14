from rest_framework import serializers
from .models import post, comentarios, votacao, opcao, clube

class postSerializer(serializers.ModelSerializer):
    class Meta:
        model = post
        fields = ['autor', 'data', 'texto', 'clube', 'upvoteNumber']

class comentariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = comentarios
        fields = ['autor', 'data', 'texto', 'postAssociado', 'likenumber'] 

class votacaoSerializer(serializers.ModelSerializer):
    votacao_set = opcaoSerializer(many=True, read_only=True)
    class Meta:
        model = votacao
        fields = ['votacao_texto', 'data_pub']

class opcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = opcao
        fields = ['questao', 'opcao_texto', 'votos']
    
class clubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = clube
        fields = ['nome', 'emblema', 'liga']

class ligaSerializer(serializers.ModelSerializer):
    class Meta:
        model = liga
        fields = ['nome', 'logo', 'pais']

