# Generated by Django 5.1.3 on 2024-12-24 04:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_sectioning_unique_limit_per_year_program'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='acadtermbilling',
            constraint=models.UniqueConstraint(fields=('billing', 'year_level', 'semester'), name='unique_acad_billing'),
        ),
    ]
