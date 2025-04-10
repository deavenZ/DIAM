from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import Questao, Opcao
from django.utils import timezone

@api_view(['GET', 'POST'])    
def questoes(request):
    if request.method == 'GET':
        lista_questoes = Questao.objects.all()
        serializer = QuestaoSerializer(lista_questoes, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Verificar se o campo pub_data está presente nos dados
        data = request.data.copy()
        if 'pub_data' not in data:
            data['pub_data'] = timezone.now()
        
        serializer = QuestaoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Retornar os erros de validação para depuração
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def detalhe_questao(request, questao_id):
    try:
        questao = Questao.objects.get(pk=questao_id)
    except Questao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
 
    if request.method == 'GET':
        serializer = QuestaoSerializer(questao)
        return Response(serializer.data)
 
    elif request.method == 'PUT':
        serializer = QuestaoSerializer(questao, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    
    elif request.method == 'DELETE':
        questao.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def opcoes(request, questao_id):
    try:
        questao = Questao.objects.get(pk=questao_id)
        print(f"Questão encontrada: {questao.questao_texto}")
    except Questao.DoesNotExist:
        print(f"Questão com ID {questao_id} não encontrada")
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        lista_opcoes = questao.opcao_set.all()
        serializer = OpcaoSerializer(lista_opcoes, many=True)
        return Response(serializer.data)
 
    elif request.method == 'POST':
        print(f"Dados recebidos: {request.data}")
        # Verificar se o campo questao já está presente nos dados
        data = request.data.copy()
        if 'questao' not in data:
            data['questao'] = questao_id
            print(f"Campo 'questao' adicionado: {data}")
        
        serializer = OpcaoSerializer(data=data)
        if serializer.is_valid():
            print("Dados válidos, salvando opção")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Retornar os erros de validação para depuração
            print(f"Erros de validação: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def detalhe_opcao(request, opcao_id):
    try:
        opcao = Opcao.objects.get(pk=opcao_id)
    except Opcao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
 
    if request.method == 'PUT':
        serializer = OpcaoSerializer(opcao, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
 
    elif request.method == 'DELETE':
        opcao.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def votar(request, opcao_id):
    try:
        opcao = Opcao.objects.get(pk=opcao_id)
    except Opcao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'POST':
        opcao.votos += 1
        opcao.save()
        serializer = OpcaoSerializer(opcao)
        return Response(serializer.data)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)







