import os
import django
from django.core.files import File

# Configurar o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Projeto.settings')
django.setup()

from bd.models import clube, liga

def create_club(nome, emblema_path, liga_nome):
    """
    Cria um novo clube no banco de dados
    
    Args:
        nome (str): Nome do clube
        emblema_path (str): Caminho para o arquivo do emblema
        liga_nome (str): Nome da liga à qual o clube pertence
    """
    try:
        # Buscar a liga
        liga_obj = liga.objects.get(nome=liga_nome)
        
        # Abrir o arquivo do emblema
        with open(emblema_path, 'rb') as f:
            # Criar o clube
            novo_clube = clube(
                nome=nome,
                liga=liga_nome
            )
            # Salvar o clube primeiro para ter um ID
            novo_clube.save()
            # Adicionar o emblema
            novo_clube.emblema.save(
                os.path.basename(emblema_path),
                File(f),
                save=True
            )
        print(f"Clube '{nome}' criado com sucesso!")
    except liga.DoesNotExist:
        print(f"Erro: Liga '{liga_nome}' não encontrada!")
    except Exception as e:
        print(f"Erro ao criar clube: {str(e)}")

if __name__ == "__main__":
    # Exemplo de uso
    create_club(
        nome="Manchester United",
        emblema_path="caminho/para/emblema.png",
        liga_nome="Premier League"
    )
