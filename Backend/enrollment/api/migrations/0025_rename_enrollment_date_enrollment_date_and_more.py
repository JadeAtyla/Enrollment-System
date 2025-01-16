# Generated by Django 5.1.3 on 2025-01-15 19:45

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_enrollment_status_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='enrollment',
            old_name='enrollment_date',
            new_name='date',
        ),
        migrations.RenameField(
            model_name='enrollment_date',
            old_name='date',
            new_name='from_date',
        ),
        migrations.AddField(
            model_name='enrollment_date',
            name='to_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]