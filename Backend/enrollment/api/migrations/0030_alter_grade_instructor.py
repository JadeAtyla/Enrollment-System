# Generated by Django 5.1.3 on 2025-01-19 11:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_alter_receipt_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grade',
            name='instructor',
            field=models.ForeignKey(blank=True, default='N/A', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='grades_given', to='api.instructor'),
        ),
    ]
