# Generated by Django 5.1.3 on 2024-11-19 01:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('street', models.CharField(max_length=55, null=True)),
                ('barangay', models.CharField(max_length=55, null=True)),
                ('city', models.CharField(max_length=55, null=True)),
                ('province', models.CharField(max_length=55, null=True)),
            ],
            options={
                'db_table': 'address',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('code', models.CharField(max_length=55, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=55, null=True)),
                ('lab_units', models.IntegerField(null=True)),
                ('lec_units', models.IntegerField(null=True)),
                ('total_units', models.IntegerField(null=True)),
                ('year_level', models.IntegerField(null=True)),
                ('semester', models.IntegerField(null=True)),
                ('school_year', models.CharField(max_length=55, null=True)),
                ('pre_requisite', models.CharField(max_length=55, null=True)),
            ],
            options={
                'db_table': 'course',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('enrollment_date', models.DateTimeField()),
                ('status', models.CharField(max_length=10)),
                ('school_year', models.DateField()),
            ],
            options={
                'db_table': 'enrollment',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('grade', models.DecimalField(db_comment='1.00 to 5.00 scale', decimal_places=2, max_digits=5, null=True)),
                ('remarks', models.CharField(max_length=21, null=True)),
            ],
            options={
                'db_table': 'grade',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Instructor',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=55)),
                ('last_name', models.CharField(max_length=55)),
                ('middle_name', models.CharField(max_length=55, null=True)),
                ('suffix', models.CharField(max_length=55, null=True)),
                ('email', models.CharField(max_length=55, null=True)),
                ('contact_number', models.CharField(max_length=55, null=True)),
                ('password', models.CharField(max_length=55, null=True)),
            ],
            options={
                'db_table': 'instructor',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Permission',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=55, null=True)),
                ('description', models.TextField(null=True)),
            ],
            options={
                'db_table': 'permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.CharField(max_length=55, primary_key=True, serialize=False)),
                ('abbreviation', models.CharField(max_length=55, null=True)),
                ('description', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'program',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('role', models.CharField(db_comment='Registrar, Admin, Department and Student', max_length=55, null=True)),
                ('description', models.TextField(null=True)),
            ],
            options={
                'db_table': 'role',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('from_time', models.TimeField(null=True)),
                ('to_time', models.TimeField(null=True)),
                ('category', models.CharField(max_length=3, null=True)),
                ('day', models.CharField(max_length=9, null=True)),
                ('room', models.CharField(max_length=55, null=True)),
            ],
            options={
                'db_table': 'schedule',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=55)),
                ('last_name', models.CharField(max_length=55)),
                ('middle_name', models.CharField(max_length=55, null=True)),
                ('suffix', models.CharField(max_length=55, null=True)),
                ('year_level', models.IntegerField(null=True)),
                ('section', models.IntegerField(null=True)),
                ('old_or_new', models.CharField(max_length=3, null=True)),
                ('status', models.CharField(max_length=11)),
                ('birth_date', models.DateField(null=True)),
                ('gender', models.CharField(max_length=17, null=True)),
                ('contact_number', models.CharField(max_length=55, null=True)),
                ('email', models.CharField(max_length=55, null=True)),
            ],
            options={
                'db_table': 'student',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=55, null=True)),
                ('last_name', models.CharField(max_length=55, null=True)),
                ('middle_name', models.CharField(max_length=55, null=True)),
                ('suffix', models.CharField(max_length=55, null=True)),
                ('email', models.CharField(max_length=55, null=True)),
                ('contact_number', models.CharField(max_length=55, null=True)),
                ('username', models.CharField(db_comment='Student will use their student number for username. Registrar, Admin and Department has different format for username', max_length=55, unique=True)),
                ('password', models.CharField(max_length=55)),
            ],
            options={
                'db_table': 'user',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Account',
        ),
        migrations.CreateModel(
            name='RolePermission',
            fields=[
                ('permission', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='app.permission')),
            ],
            options={
                'db_table': 'role_permission',
                'managed': False,
            },
        ),
    ]
