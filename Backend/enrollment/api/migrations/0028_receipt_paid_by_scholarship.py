# Generated by Django 5.1.3 on 2025-01-19 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_rename_enrollment_date_enrollmentdate'),
    ]

    operations = [
        migrations.AddField(
            model_name='receipt',
            name='paid_by_scholarship',
            field=models.BooleanField(default=True),
        ),
    ]
