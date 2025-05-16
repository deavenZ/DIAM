from rest_framework import serializers
from .models import Post, Comentarios, Votacao, Opcao, Clube, Liga, Utilizador


class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ["questao", "opcao_texto", "votos"]


class VotacaoSerializer(serializers.ModelSerializer):
    votacao_set = OpcaoSerializer(many=True, read_only=True)

    class Meta:
        model = Votacao
        fields = ["votacao_texto", "data_pub", "votacao_set"]


class UtilizadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilizador
        fields = [
            "username",
            "nome",
            "email",
            "avatar",
            "bio",
            "userType",
            "favClub",
            "joinDate",
        ]


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["autor", "data", "titulo", "texto", "liga", "clube", "upvoteNumber"]


class ComentariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentarios
        fields = ["autor", "data", "texto", "postAssociado", "likenumber"]


class ClubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clube
        fields = ["id", "nome", "emblema", "liga"]


class LigaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Liga
        fields = ["id", "nome", "logo", "pais"]
