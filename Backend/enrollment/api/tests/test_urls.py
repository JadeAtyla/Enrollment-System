from django.test import SimpleTestCase


class TestUrls(SimpleTestCase):

    def test_register_url_is_resolved(self):
        assert 1 == 2