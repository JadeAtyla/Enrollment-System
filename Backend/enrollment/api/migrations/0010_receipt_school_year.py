# Generated by Django 5.1.3 on 2024-12-26 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_acadtermbilling_unique_acad_billing'),
    ]

    operations = [
        migrations.AddField(
            model_name='receipt',
            name='school_year',
            field=models.CharField(default='2024-2025', max_length=20),
            preserve_default=False,
        ),
    ]
