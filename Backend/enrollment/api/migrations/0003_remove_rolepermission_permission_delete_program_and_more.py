# Generated by Django 5.1.3 on 2024-11-28 13:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_billing_prerequisite_alter_address_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rolepermission',
            name='permission',
        ),
        migrations.DeleteModel(
            name='Program',
        ),
        migrations.RemoveField(
            model_name='user',
            name='role',
        ),
        migrations.RemoveField(
            model_name='rolepermission',
            name='role',
        ),
        migrations.AlterUniqueTogether(
            name='rolepermission',
            unique_together=None,
        ),
        migrations.DeleteModel(
            name='Permission',
        ),
        migrations.DeleteModel(
            name='User',
        ),
        migrations.DeleteModel(
            name='Role',
        ),
        migrations.DeleteModel(
            name='RolePermission',
        ),
    ]
