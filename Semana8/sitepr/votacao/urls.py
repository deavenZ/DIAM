from django.urls import path
from . import views

app_name = 'votacao'

urlpatterns = [
    path('api/questoes/', views.questoes),
    path('api/questao/<int:questao_id>/', views.detalhe_questao),
    path('api/opcoes/<int:questao_id>/', views.opcoes),
    path('api/opcao/<int:opcao_id>/', views.detalhe_opcao),
    path('api/opcao/<int:opcao_id>/votar/', views.votar),
]