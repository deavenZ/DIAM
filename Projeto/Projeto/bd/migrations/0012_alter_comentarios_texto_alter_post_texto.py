# Generated by Django 5.2.1 on 2025-05-18 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bd', '0011_post_upvoted_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comentarios',
            name='texto',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='texto',
            field=models.TextField(blank=True, max_length=3000, null=True),
        ),
    ]
