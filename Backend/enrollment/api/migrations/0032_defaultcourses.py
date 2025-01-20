# Generated by Django 5.1.3 on 2025-01-20 06:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_alter_grade_instructor'),
    ]

    operations = [
        migrations.CreateModel(
            name='DefaultCourses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_edited', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='default_course', to='api.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='default_courses', to='api.student')),
            ],
            options={
                'verbose_name': 'Default Course',
                'verbose_name_plural': 'Default Courses',
                'unique_together': {('student', 'course')},
            },
        ),
    ]