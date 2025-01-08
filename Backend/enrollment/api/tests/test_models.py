'''
from django.test import TestCase
from api.models import Address

class TestModels(TestCase):

    def setUp(self):
        self.project1 = Address.objects.create(
            name='address',
            api=10000
        )
'''