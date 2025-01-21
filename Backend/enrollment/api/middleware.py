from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check for the access token in cookies
        access_token = request.COOKIES.get('access_token')
        if access_token:
            # Set the token in the Authorization header
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
        return self.get_response(request)
