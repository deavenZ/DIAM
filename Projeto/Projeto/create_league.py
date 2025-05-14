import os
import sys
import django
from django.core.files import File

# Adicionar o diretório do projeto ao PYTHONPATH
current_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_path)

# Configurar o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pontapedesaida.settings')
django.setup()

from bd.models import liga

def create_league(nome, logo_path, pais):
    """
    Cria uma nova liga no banco de dados
    
    Args:
        nome (str): Nome da liga
        logo_path (str): Caminho para o arquivo de logo
        pais (str): País da liga
    """
    try:
        print(f"Tentando criar liga: {nome}")
        print(f"Caminho do logo: {logo_path}")
        
        # Verificar se o arquivo existe
        if not os.path.exists(logo_path):
            print(f"ERRO: Arquivo de logo não encontrado: {logo_path}")
            return
            
        # Verificar se a liga já existe no banco de dados
        if liga.objects.filter(nome=nome).exists():
            print(f"Liga '{nome}' já existe no banco de dados.")
            return
            
        # Abrir o arquivo de logo
        with open(logo_path, 'rb') as f:
            # Criar a liga
            nova_liga = liga(
                nome=nome,
                pais=pais
            )
            # Salvar a liga primeiro para ter um ID
            nova_liga.save()
            # Adicionar o logo
            nova_liga.logo.save(
                os.path.basename(logo_path),
                File(f),
                save=True
            )
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
        create_league(
            nome=liga_info['nome'],
            logo_path=logo_path,
            pais=liga_info['pais']
        )
