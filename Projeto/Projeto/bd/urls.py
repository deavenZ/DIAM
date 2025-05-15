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
    path("api/token/", obtain_auth_token),
]
