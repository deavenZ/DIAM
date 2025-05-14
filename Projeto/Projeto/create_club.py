import os
import sys
import django
from django.core.files.base import ContentFile

current_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pontapedesaida.settings')
django.setup()

from bd.models import Clube, Liga

# Cria um novo clube na base de dados
def create_club(nome, logo_path, liga_nome):
    try:
        print(f"Tentando criar clube: {nome}")
        print(f"Caminho do logo: {logo_path}")
        print(f"Liga: {liga_nome}")
        
        # Verifica se o arquivo existe
        if not os.path.exists(logo_path):
            print(f"ERRO: Arquivo de logo não encontrado: {logo_path}")
            return
            
        # Verifica se o clube já existe na base de dados
        if Clube.objects.filter(nome=nome).exists():
            print(f"Clube '{nome}' já existe no banco de dados.")
            return

        # Busca a liga
        liga_obj = Liga.objects.get(nome=liga_nome)
        
        # Abre o arquivo do logo
        with open(logo_path, 'rb') as f:
            # Cria o clube
            novo_clube = Clube(nome=nome, liga=liga_obj)

            # Guarda o clube primeiro para ter um ID
            novo_clube.save()

            # Adiciona o logo
            content = f.read()
            novo_clube.emblema.save(os.path.basename(logo_path), ContentFile(content), save=True)

        print(f"Clube '{nome}' criado com sucesso!")
    except Liga.DoesNotExist:
        print(f"Erro: Liga '{liga_nome}' não encontrada!")
    except FileNotFoundError:
        print(f"Erro: Arquivo de logo não encontrado: {logo_path}")
    except Exception as e:
        print(f"Erro ao criar clube: {str(e)}")

if __name__ == "__main__":
    # Lista de clubes para criar
    clubes = [
        # Premier League
        {
            "nome": "Arsenal",
            "logo_nome": "arsenal",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Aston Villa",
            "logo_nome": "astonvilla",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Bournemouth",
            "logo_nome": "bournemouth",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Brentford",
            "logo_nome": "brentford",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Brighton",
            "logo_nome": "brighton",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Chelsea",
            "logo_nome": "chelsea",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Crystal Palace",
            "logo_nome": "crystalpalace",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Everton",
            "logo_nome": "everton",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Fulham",
            "logo_nome": "fulham",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Ipswich",
            "logo_nome": "ipswich",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Leicester",
            "logo_nome": "leicester",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Liverpool",
            "logo_nome": "liverpool",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Manchester City",
            "logo_nome": "mancity",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Manchester United",
            "logo_nome": "manutd",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Newcastle",
            "logo_nome": "newcastle",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Nottingham Forest",
            "logo_nome": "nottingham",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Southampton",
            "logo_nome": "southampton",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Tottenham",
            "logo_nome": "tottenham",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "West Ham",
            "logo_nome": "westham",
            "liga_nome": "Premier League",
            "pais": "england"
        },
        {
            "nome": "Wolverhampton",
            "logo_nome": "wolves",
            "liga_nome": "Premier League",
            "pais": "england"
        },

        # La Liga
        {
            "nome": "Alavés",
            "logo_nome": "alaves",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Atlético Bilbao",
            "logo_nome": "atleticobilbao",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Atlético Madrid",
            "logo_nome": "atleticomadrid",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Barcelona",
            "logo_nome": "barcelona",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Celta de Vigo",
            "logo_nome": "celtadevigo",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Espanyol",
            "logo_nome": "espanyol",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Getafe",
            "logo_nome": "getafe",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Girona",
            "logo_nome": "girona",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Las Palmas",
            "logo_nome": "laspalmas",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Leganés",
            "logo_nome": "leganes",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Mallorca",
            "logo_nome": "mallorca",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Osasuna",
            "logo_nome": "osasuna",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Rayo Vallecano",
            "logo_nome": "rayovallecano",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Real Betis",
            "logo_nome": "realbetis",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Real Madrid",
            "logo_nome": "realmadrid",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Real Sociedad",
            "logo_nome": "realsociedad",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Real Valladolid",
            "logo_nome": "realvalladolid",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Sevilla",
            "logo_nome": "sevilla",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Valencia",
            "logo_nome": "valencia",
            "liga_nome": "La Liga",
            "pais": "spain"
        },
        {
            "nome": "Villarreal",
            "logo_nome": "vilarreal",
            "liga_nome": "La Liga",
            "pais": "spain"
        },

        # Serie A
        {
            "nome": "AC Milan",
            "logo_nome": "acmilan",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Atalanta",
            "logo_nome": "atalanta",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Bologna",
            "logo_nome": "bologna",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Cagliari",
            "logo_nome": "cagliari",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Como",
            "logo_nome": "como",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Empoli",
            "logo_nome": "empoli",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Fiorentina",
            "logo_nome": "fiorentina",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Genoa",
            "logo_nome": "genoa",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Hellas Verona",
            "logo_nome": "hellasverona",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Inter Milan",
            "logo_nome": "intermilan",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Juventus",
            "logo_nome": "juventus",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Lazio",
            "logo_nome": "lazio",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Lecce",
            "logo_nome": "lecce",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Monza",
            "logo_nome": "monza",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Napoli",
            "logo_nome": "napoli",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Parma",
            "logo_nome": "parma",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Roma",
            "logo_nome": "roma",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Torino",
            "logo_nome": "torino",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Udinese",
            "logo_nome": "udinese",
            "liga_nome": "Serie A",
            "pais": "italy"
        },
        {
            "nome": "Venezia",
            "logo_nome": "venezia",
            "liga_nome": "Serie A",
            "pais": "italy"
        },

        # Bundesliga
        {
            "nome": "Augsburg",
            "logo_nome": "augsburg",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Bayern Munich",
            "logo_nome": "bayern",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Bochum",
            "logo_nome": "bochum",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Borussia Dortmund",
            "logo_nome": "dortmund",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Eintracht Frankfurt",
            "logo_nome": "frankfurt",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Freiburg",
            "logo_nome": "freiburg",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Heidenheim",
            "logo_nome": "heidenheim",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Hoffenheim",
            "logo_nome": "hoffenheim",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Holstein Kiel",
            "logo_nome": "holsteinkiel",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Bayer Leverkusen",
            "logo_nome": "leverkusen",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "RB Leipzig",
            "logo_nome": "leipzig",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Mainz",
            "logo_nome": "mainz",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Borussia Mönchengladbach",
            "logo_nome": "monchengladbach",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "St. Pauli",
            "logo_nome": "stpauli",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Stuttgart",
            "logo_nome": "stuttgart",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Union Berlin",
            "logo_nome": "unionberlin",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Werder Bremen",
            "logo_nome": "werderbremen",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },
        {
            "nome": "Wolfsburg",
            "logo_nome": "wolfsburg",
            "liga_nome": "Bundesliga",
            "pais": "germany"
        },

        # Ligue 1
        {
            "nome": "Angers",
            "logo_nome": "angers",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Auxerre",
            "logo_nome": "auxerre",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Le Havre",
            "logo_nome": "lehavre",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Lens",
            "logo_nome": "lens",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Lille",
            "logo_nome": "lille",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Lyon",
            "logo_nome": "lyon",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Marseille",
            "logo_nome": "marseille",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Monaco",
            "logo_nome": "monaco",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Montpellier",
            "logo_nome": "montpellier",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Nantes",
            "logo_nome": "nantes",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Nice",
            "logo_nome": "nice",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Paris Saint-Germain",
            "logo_nome": "psg",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Reims",
            "logo_nome": "reims",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Rennes",
            "logo_nome": "rennes",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Saint-Étienne",
            "logo_nome": "saintetienne",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Stade Brest",
            "logo_nome": "stadebrest",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Strasbourg",
            "logo_nome": "strasbourg",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },
        {
            "nome": "Toulouse",
            "logo_nome": "toulouse",
            "liga_nome": "Ligue 1",
            "pais": "france"
        },

        # Liga Portugal
        {
            "nome": "Arouca",
            "logo_nome": "arouca",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "AVS",
            "logo_nome": "aves",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Benfica",
            "logo_nome": "benfica",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Boavista",
            "logo_nome": "boavista",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Braga",
            "logo_nome": "braga",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Casa Pia",
            "logo_nome": "casapia",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Estoril",
            "logo_nome": "estoril",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Estrela da Amadora",
            "logo_nome": "estreladaamadora",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Famalicão",
            "logo_nome": "famalicao",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Farense",
            "logo_nome": "farense",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Gil Vicente",
            "logo_nome": "gilvicente",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Moreirense",
            "logo_nome": "moreirense",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Nacional",
            "logo_nome": "nacional",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Porto",
            "logo_nome": "porto",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Rio Ave",
            "logo_nome": "rioave",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Santa Clara",
            "logo_nome": "santaclara",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Sporting",
            "logo_nome": "sporting",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        },
        {
            "nome": "Vitória SC",
            "logo_nome": "vitoria",
            "liga_nome": "Liga Portugal",
            "pais": "portugal"
        }
    ]
    
    for clube_info in clubes:
        logo_path = os.path.join('frontend', 'public', 'clubs_logos', clube_info['pais'], f"{clube_info['logo_nome']}.png")
        create_club(clube_info["nome"], logo_path, clube_info["liga_nome"])

