import os
import sys
import django
from django.db import connection

# Adicionar o diretório do projeto ao PYTHONPATH
current_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_path)

# Configurar o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pontapedesaida.settings')
django.setup()

from bd.models import liga

def reset_league_ids():
    """
    Reseta os IDs das ligas para começar do 1
    """
    try:
        # Deletar todas as ligas
        liga.objects.all().delete()
        
        # Resetar a sequência de IDs
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='bd_liga';")
        
        print("IDs das ligas resetados com sucesso!")
    except Exception as e:
        print(f"Erro ao resetar IDs: {str(e)}")

if __name__ == "__main__":
    reset_league_ids() 