from django.test import SimpleTestCase
from django.urls import reverse, resolve
from api.views import RegisterView, CustomTokenObtainPairView, RegistrarUserView

class TestUrls(SimpleTestCase):

    def test_register_url_is_resolved(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func.view_class, RegisterView)

    def test_register_url_is_resolved(self):
        url = reverse('login')
        self.assertEqual(resolve(url).func.view_class, CustomTokenObtainPairView)

    def test_register_url_is_resolved(self):
        url = reverse('registrar-login')
        self.assertEqual(resolve(url).func.view_class, RegistrarUserView)

    def test_register_url_is_resolved(self):
        url = reverse('student-login')
        self.assertEqual(resolve(url).func.view_class, RegisterView)


        
    