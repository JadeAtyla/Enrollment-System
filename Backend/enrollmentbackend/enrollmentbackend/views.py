# Sample View File
from rest_framework.views import APIView
from rest_framework.response import Response

class ExampleView(APIView):
    def get(self, request):
        return Response({"message": "Hello, React!"})