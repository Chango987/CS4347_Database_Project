# Generated by Django 4.2.9 on 2024-02-01 17:06

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("stocks", "0004_alter_userstocks_shares"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="userstocks",
            unique_together={("user", "stocks")},
        ),
    ]