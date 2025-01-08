from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import Group, User
from api.models import AcadTermBilling, BillingList

class BaseViewTestCase(APITestCase):
    """Base test case class to handle setup and utility methods."""

    def setUp(self):
        self.client = APIClient()

        # Create a user and assign them to a group with necessary permissions
        self.group = Group.objects.create(name="TestGroup")
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.user.groups.add(self.group)
        self.client.force_authenticate(user=self.user)

class AcadTermBillingViewTest(BaseViewTestCase):
    def setUp(self):
        super().setUp()
        self.billing_list = BillingList.objects.create(name="Test Billing")
        self.acad_term_billing = AcadTermBilling.objects.create(
            billing=self.billing_list,
            price=1500.00,
            year_level=2,
            semester=1
        )
        self.url = f"/api/acad-term-billing/{self.acad_term_billing.id}/"

    def test_get_acad_term_billing(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_acad_term_billing(self):
        data = {
            "billing": self.billing_list.id,
            "price": 2000.00,
            "year_level": 3,
            "semester": 2
        }
        response = self.client.post("/api/acad-term-billing/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
