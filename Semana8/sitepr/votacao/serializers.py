from rest_framework import serializers
from .models import Questao, Opcao


class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ['pk', 'opcao_texto', 'questao', 'votos']


class QuestaoSerializer(serializers.ModelSerializer):
    opcao_set = OpcaoSerializer(many=True, read_only=True)

    class Meta:
        model = Questao
        fields = ['pk', 'questao_texto', 'pub_data', 'opcao_set']