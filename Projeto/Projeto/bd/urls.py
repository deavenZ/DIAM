from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

app_name = "bd"

urlpatterns = [
    path("api/auth/register/", views.register),
    path("api/auth/login/", views.login_view),
    path("api/auth/logout/", views.logout_view),
    path("api/auth/user/", views.user_view),
    path("api/profile/", views.profile_view),
    #path("api/posts/", views.PostListView.as_view()),
    path("api/posts/", views.criar_post),
    #path("api/posts/<int:post_id>/", views.PostDetailView.as_view()),
    #path("api/posts/<int:post_id>/comments/", views.ComentariosListView.as_view()),
    path("api/token/", obtain_auth_token),
    path("api/change-password/", views.change_password),
    path("api/ligas/<int:liga_id>/clubes/", views.clubes_por_liga),
    path("api/ligas/", views.LigaListView.as_view()),
    path("api/clubes/", views.ClubeListView.as_view()),
]
