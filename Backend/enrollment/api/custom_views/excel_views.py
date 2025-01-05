from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.http import FileResponse
from ..utils.services import StudentExcelService, BillingExcelService
from .models import Student, AcadTermBilling, Grade
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


class GenerateCORAPI(APIView):
    #API endpoint for generating a Certificate of Registration (COR).
    
    def get(self, request, student_id):
        try:
            # Generate the COR file
            file_path = self.generate_registration_form(student_id)

            # Return the file as a downloadable response
            return FileResponse(
                open(file_path, 'rb'), as_attachment=True, filename=f"registration_form_{student_id}.xlsx"
            )
        except Student.DoesNotExist:
            return Response({"error": "Student not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @staticmethod
    def generate_registration_form(student_id):
        # Fetch the student data
        student = Student.objects.get(id=student_id)
        address = student.address

        # Create a workbook and sheet
        wb = Workbook()
        sheet = wb.active
        sheet.title = "Registration Form"

        # Add an image to the workbook
        # Edit path attr. kung hindi tama hehe
        logo_path = os.path.join(settings.BASE_DIR, 'static/images/Ulogo.png') #UNIVERSITY LOGO
        if os.path.exists(logo_path):
            img = Image(logo_path)
            img.width, img.height = 150, 75
            sheet.add_image(img, "A1")

        # Add header information
        sheet["A6"] = "CAVITE STATE UNIVERSITY - Bacoor Campus"
        sheet["A7"] = "REGISTRATION FORM"

        # Add student information
        sheet["A9"] = "Student Number:"
        sheet["B9"] = student.id

        sheet["A10"] = "Student Name:"
        sheet["B10"] = f"{student.last_name}, {student.first_name} {student.middle_name or ''}"

        sheet["A11"] = "Address:"
        sheet["B11"] = f"{address.street}, {address.barangay}, {address.city}, {address.province}"

        # Add course details
        sheet["A13"] = "Course Code"
        sheet["B13"] = "Course Title"
        sheet["C13"] = "Units"
        sheet["D13"] = "Day"
        sheet["E13"] = "Time"
        sheet["F13"] = "Room"

        row = 14
        for enrollment in student.enrollments.all():
            sheet[f"A{row}"] = enrollment.course.code
            sheet[f"B{row}"] = enrollment.course.title
            sheet[f"C{row}"] = enrollment.course.lab_units + enrollment.course.lec_units
            sheet[f"D{row}"] = "CS"  # Example static value
            sheet[f"E{row}"] = "6:90 AM - 4:20 PM"  # Example static value
            sheet[f"F{row}"] = "Room 69"  # Example static value
            row += 1

        # Save the file
        file_path = os.path.join(settings.MEDIA_ROOT, f"registration_form_{student_id}.xlsx")
        wb.save(file_path)
        return file_path
