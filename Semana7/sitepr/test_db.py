from votacao.models import Questao, Opcao
from django.utils import timezone
import datetime

# Exercicio a)
questoes = Questao.objects.all()

print("\nTodas as questoes: ")
for questao in questoes:
    print("- " + questao.questao_texto)

#Exercicio b)

questao2 = Questao.objects.filter(questao_texto__startswith = "Gostas de...").first()
print("\nOpcoes da Questao '" + questao2.questao_texto + "' :")
opcoesQuestao2 = Opcao.objects.filter(questao = questao2)

i = 0
for opcao in opcoesQuestao2:
    temp = chr(65 + i)
    print(temp + " - " + opcao.opcao_texto)
    i = i + 1

#Exercicio c)

print("\nOpcoes da Questao '" + questao2.questao_texto + "' com mais de 2 votos:")

i = 0
for opcao in opcoesQuestao2:
    if(opcao.votos > 2):
        temp = chr(65 + i)
        print(temp + " - " + opcao.opcao_texto)
        i = i + 1

#Exercicio d)

print("\nTodas as questoes publicadas no ultimos 3 anos: ")
for questao in questoes:
    if(questao.pub_data >timezone.now() - datetime.timedelta(days=3*365)):
        print("- " + questao.questao_texto)

# Exercicio e)

total = 0
for questao in questoes:
    opcoes = Opcao.objects.filter(questao=questao)
    for opcao in opcoes:
        total = total + opcao.votos

print("\nNumero total de votos da base de dados: " + str(total))

#Exercicio f)

print("\nQuestoes e a sua opcao com mais votos: ")
for questao in questoes:
    print("  Questao : " + questao.questao_texto)
    opcoes = Opcao.objects.filter(questao=questao)
    opcaoMaisVotos = max(opcoes, key=lambda opcao: opcao.votos)
    print("     Opcao com mais votos: " + opcaoMaisVotos.opcao_texto)
