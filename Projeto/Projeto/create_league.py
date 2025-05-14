import os
import sys
import django
from django.core.files.base import ContentFile

current_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pontapedesaida.settings')
django.setup()

from bd.models import Liga

# Cria uma nova liga na base de dados
def create_league(nome, logo_path, pais):
    try:
        print(f"Tentando criar liga: {nome}")
        print(f"Caminho do logo: {logo_path}")
        
        # Verificar se o arquivo existe
        if not os.path.exists(logo_path):
            print(f"ERRO: Arquivo de logo não encontrado: {logo_path}")
            return
            
        # Verifica se a liga já existe na base de dados
        if Liga.objects.filter(nome=nome).exists():
            print(f"Liga '{nome}' já existe no banco de dados.")
            return
            
        # Abre o arquivo onde estão os logos das ligas
        with open(logo_path, 'rb') as f:
            # Criar a liga
            nova_liga = Liga(nome=nome, pais=pais)

            # Guarda a liga primeiro para ter um ID
            nova_liga.save()

            # Adicionar o logo
            content = f.read()
            nova_liga.logo.save(os.path.basename(logo_path), ContentFile(content), save=True)

        print(f"Liga '{nome}' criada com sucesso!")
    except Exception as e:
        print(f"Erro ao criar liga '{nome}': {str(e)}")

if __name__ == "__main__":
    # Lista de ligas para criar
    ligas = [
        {
            "nome": "Premier League",
            "pais": "Inglaterra",
            "logo_nome": "premierleague"
        },
        {
            "nome": "La Liga",
            "pais": "Espanha",
            "logo_nome": "laliga"
        },
        {
            "nome": "Serie A",
            "pais": "Itália",
            "logo_nome": "seriea"
        },
        {
            "nome": "Bundesliga",
            "pais": "Alemanha",
            "logo_nome": "bundesliga"
        },
        {
            "nome": "Ligue 1",
            "pais": "França",
            "logo_nome": "ligue1"
        },
        {
            "nome": "Liga Portugal",
            "pais": "Portugal",
            "logo_nome": "ligaportugal"
        }
    ]

    # Criar cada liga
    for liga_info in ligas:
        logo_path = os.path.join('frontend', 'public', 'comp_logos', f"{liga_info['logo_nome']}.png")
        create_league(nome=liga_info['nome'], logo_path=logo_path, pais=liga_info['pais'])
