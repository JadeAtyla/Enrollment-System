# Generated by Django 5.1.3 on 2025-01-07 02:31

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_student_section_alter_student_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='enrollment_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]