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
            "id",
            "username",
            "nome",
            "email",
            "avatar",
            "bio",
            "userType",
            "favClub",
            "joinDate",
        ]


class ComentariosSerializer(serializers.ModelSerializer):

    autor_username = serializers.CharField(source="autor.user.username", read_only=True)
    autor_avatar = serializers.ImageField(source="autor.avatar", read_only=True)

    class Meta:
        model = Comentarios
        fields = [
            "id",
            "autor",
            "autor_username",
            "autor_avatar",
            "data",
            "texto",
            "post",
            "likenumber",
        ]


class ClubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clube
        fields = ["id", "nome", "emblema", "liga"]


class LigaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Liga
        fields = ["id", "nome", "logo", "pais"]


class PostSerializer(serializers.ModelSerializer):
    autor = serializers.SerializerMethodField()
    clube = ClubeSerializer(read_only=True)
    liga = LigaSerializer(read_only=True)
    clube_id = serializers.PrimaryKeyRelatedField(
        queryset=Clube.objects.all(),
        source="clube",
        write_only=True,
        required=False,
        allow_null=True,
    )
    liga_id = serializers.PrimaryKeyRelatedField(
        queryset=Liga.objects.all(),
        source="liga",
        write_only=True,
        required=False,
        allow_null=True,
    )
    comentarios_count = serializers.SerializerMethodField()

    def get_comentarios_count(self, obj):
        return obj.comentarios_set.count()

    def get_upvoted(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.upvoted_users.filter(id=user.utilizador.id).exists()
        return False

    class Meta:
        model = Post
        fields = [
            "id",
            "autor",
            "data",
            "titulo",
            "texto",
            "liga",
            "clube",
            "liga_id",  
            "clube_id",  
            "upvoteNumber",
            "imagem",
            "comentarios_count",
        ]

    def get_autor(self, obj):
        return obj.autor.username if obj.autor else None
