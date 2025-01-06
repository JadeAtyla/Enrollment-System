from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.http import FileResponse
from ..utils.services import StudentExcelService, BillingExcelService
from ..models import Student, AcadTermBilling, Grade
from ..utils.validators import FileValidator 
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, Border, Side, PatternFill
from openpyxl.utils import get_column_letter
from openpyxl.drawing.image import Image
from django.conf import settings
import os

class StudentExcelAPI(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "No file uploaded."}, status=400)

        if not FileValidator.is_valid_excel(file):
            return Response({"error": "Invalid file format. Please upload an Excel file."}, status=400)

        try:
            service = StudentExcelService()
            data = service.read(file)
            result = service.process(data)
            return Response({"message": result}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class BillingExcelAPI(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "No file uploaded."}, status=400)

        if not FileValidator.is_valid_excel(file):
            return Response({"error": "Invalid file format. Please upload an Excel file."}, status=400)

        try:
            service = BillingExcelService()
            data = service.read(file)
            result = service.process(data)
            return Response({"message": result}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
