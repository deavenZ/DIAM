from rest_framework import serializers
from .models import Questao, Opcao


class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ('pk', 'opcao_texto', 'votos')


class QuestaoSerializer(serializers.ModelSerializer):
    opcoes = OpcaoSerializer(source='opcao_set', many=True, read_only=True)

    class Meta:
        model = Questao
        fields = ('pk', 'questao_texto', 'pub_data', 'opcoes')