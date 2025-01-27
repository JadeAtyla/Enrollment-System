# Generated by Django 5.1.3 on 2024-12-16 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='receipt',
            name='remaining',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='receipt',
            name='status',
            field=models.CharField(blank=True, choices=[('PAID', 'Paid'), ('UNPAID', 'Unpaid'), ('PENDING', 'Pending')], max_length=55, null=True),
        ),
        migrations.AlterField(
            model_name='receipt',
            name='terms',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
