# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-11-02 10:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0003_auto_20171018_1219'),
    ]

    operations = [
        migrations.AddField(
            model_name='commentlike',
            name='liked',
            field=models.BooleanField(default=False),
        ),
    ]