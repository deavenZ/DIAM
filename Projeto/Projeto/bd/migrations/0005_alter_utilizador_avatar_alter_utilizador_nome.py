# Generated by Django 5.2 on 2025-05-15 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bd', '0004_alter_utilizador_joindate_alter_utilizador_nome'),
    ]

    operations = [
        migrations.AlterField(
            model_name='utilizador',
            name='avatar',
            field=models.ImageField(blank=True, default='frontend\\public\\default_avatar.png', null=True, upload_to='avatars'),
        ),
        migrations.AlterField(
            model_name='utilizador',
            name='nome',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
