from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Utilizador


@receiver(post_save, sender=User)
def criar_utilizador(sender, instance, created, **kwargs):
    if created:
        # Verifica se já existe um Utilizador
        if hasattr(instance, "utilizador"):
            return

        # Se for utilizador normal ignora
        if not instance.is_staff and not instance.is_superuser:
            return

        # Criação automática para superadmin e moderador
        if instance.is_superuser:
            user_type = 2  # superadmin
        elif instance.is_staff:
            user_type = 1  # moderador

        Utilizador.objects.create(
            user=instance,
            username=instance.username,
            nome="",
            email=instance.email or "",
            userType=user_type,
        )


@receiver(post_save, sender=User)
def guardar_utilizador(sender, instance, **kwargs):
    try:
        instance.utilizador.save()
    except Utilizador.DoesNotExist:
        pass
