from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import Questao, Opcao

@api_view(['GET', 'POST'])    
def questions(request):
    if request.method == 'GET':
        question_list = Questao.objects.all()
        serializer = QuestaoSerializer(question_list, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = QuestaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def question_detail(request, question_id):
    try:
        question = Questao.objects.get(pk=question_id)
    except Questao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
 
    if request.method == 'GET':
        serializer = QuestaoSerializer(question)
        return Response(serializer.data)
 
    elif request.method == 'PUT':
        serializer = QuestaoSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    
    elif request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def options(request, question_id):
    try:
        question = Questao.objects.get(pk=question_id)
    except Questao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        option_list = question.opcao_set.all()
        serializer = OpcaoSerializer(option_list, many=True)
        return Response(serializer.data)
 
    elif request.method == 'POST':
        data = request.data.copy()
        data['questao'] = question_id
        serializer = OpcaoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def option_detail(request, option_id):
    try:
        option = Opcao.objects.get(pk=option_id)
    except Opcao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
 
    if request.method == 'PUT':
        serializer = OpcaoSerializer(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
 
    elif request.method == 'DELETE':
        option.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def vote(request, option_id):
    try:
        option = Opcao.objects.get(pk=option_id)
    except Opcao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'POST':
        option.votos += 1
        option.save()
        serializer = OpcaoSerializer(option)
        return Response(serializer.data)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)







