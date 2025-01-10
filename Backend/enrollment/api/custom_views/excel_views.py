from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.http import FileResponse
from ..utils.services import StudentExcelService, BillingExcelService
from api.models import Student, AcadTermBilling, Grade, Enrollment, BillingList, Receipt
from ..utils.validators import FileValidator
from openpyxl import Workbook
from openpyxl.styles import Font
from openpyxl.drawing.image import Image
from django.conf import settings
from django.db.models import Sum
from ..serializers import StudentSerializer, EnrollmentSerializer, ReceiptSerializer
from ..utils.filterer import QuerysetFilter
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
    # API endpoint for generating a Certificate of Registration (COR).

    def get(self, request, student_id):
        try:
            # Fetch the student data
            student = Student.objects.get(id=student_id)
            student_data = StudentSerializer(student).data

            # Fetch enrollments
            enrollments = Enrollment.objects.filter(student=student, school_year=student_data['academic_year'])
            enrollments_data = EnrollmentSerializer(enrollments, many=True).data

            # Fetch billing data
            billing_list = BillingList.objects.all()
            joined_data = []
            for billing in billing_list:
                acad_term_billing = AcadTermBilling.objects.filter(
                    billing=billing,
                    year_level=student_data['year_level'],
                    semester=student_data['semester']
                ).first()

                joined_data.append({
                    "billing_list": {
                        "name": billing.name,
                        "category": billing.category,
                        "price": acad_term_billing.price if acad_term_billing else None,
                        "year_level": acad_term_billing.year_level if acad_term_billing else None,
                        "semester": acad_term_billing.semester if acad_term_billing else None
                    }
                })

            # Calculate total billing price
            assessment_billing_list = BillingList.objects.filter(category='ASSESSMENT')
            total_acad_term_billings = AcadTermBilling.objects.filter(
                billing__in=assessment_billing_list,
                year_level=student_data['year_level'],
                semester=student_data['semester']
            ).aggregate(total_price=Sum('price'))['total_price'] or 0

            # Fetch receipts
            receipts = Receipt.objects.filter(student=student, school_year=student_data['academic_year'])
            receipts_data = ReceiptSerializer(receipts, many=True).data

            # Generate the COR file
            file_path = self.generate_registration_form(student_data, enrollments_data, joined_data, total_acad_term_billings, receipts_data)

            # Return the file as a downloadable response
            return FileResponse(
                open(file_path, 'rb'), as_attachment=True, filename=f"registration_form_{student_id}.xlsx"
            )
        except Student.DoesNotExist:
            return Response({"error": "Student not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @staticmethod
    def generate_registration_form(student_data, enrollments_data, joined_data, total_acad_term_billings, receipts_data):
        # Create a workbook and sheet
        wb = Workbook()
        sheet = wb.active
        sheet.title = "Registration Form"

        # Add an image to the workbook
        logo_path = os.path.join(settings.BASE_DIR, 'static/images/Uni_Logo.png')  # UNIVERSITY LOGO
        if os.path.exists(logo_path):
            img = Image(logo_path)
            img.width, img.height = 150, 75
            sheet.add_image(img, "A1")

        # Add header information
        header_font = Font(size=12, bold=True)
        sheet["A1"] = "Republic of the Philippines"
        sheet["A1"].font = header_font
        sheet["A2"] = "CAVITE STATE UNIVERSITY"
        sheet["A2"].font = Font(size=14, bold=True)
        sheet["A3"] = "Bacoor Campus"
        sheet["A3"].font = header_font
        sheet["A4"] = "Bacoor City, Cavite"
        sheet["A4"].font = header_font

        # Add student information
        info_font = Font(size=10)
        sheet["A9"] = "Student Number:"
        sheet["B9"] = student_data['id']
        sheet["A9"].font = info_font
        sheet["B9"].font = info_font

        sheet["A10"] = "Student Name:"
        sheet["B10"] = f"{student_data['last_name']}, {student_data['first_name']} {student_data['middle_name'] or ''}"
        sheet["A10"].font = info_font
        sheet["B10"].font = info_font

        sheet["A11"] = "Course:"
        sheet["B11"] = student_data['program']
        sheet["A11"].font = info_font
        sheet["B11"].font = info_font

        sheet["A12"] = "Year:"
        sheet["B12"] = student_data['year_level']
        sheet["A12"].font = info_font
        sheet["B12"].font = info_font

        sheet["A13"] = "Address:"
        address = student_data.get('address', {})
        sheet["B13"] = f"{address.get('street', '')}, {address.get('barangay', '')}, {address.get('city', '')}, {address.get('province', '')}"
        sheet["A13"].font = info_font
        sheet["B13"].font = info_font

        sheet["A14"] = "Semester:"
        sheet["B14"] = student_data['semester']
        sheet["A14"].font = info_font
        sheet["B14"].font = info_font

        sheet["A15"] = "Date:"
        sheet["B15"] = "[dd-mm-yyyy]"
        sheet["A15"].font = info_font
        sheet["B15"].font = info_font

        sheet["A16"] = "Section:"
        sheet["B16"] = f"{student_data['program']} {student_data['year_level']}-{student_data['section'] or 'TBA'}"
        sheet["A16"].font = info_font
        sheet["B16"].font = info_font

        sheet["A17"] = "School Year:"
        sheet["B17"] = student_data['academic_year']
        sheet["A17"].font = info_font
        sheet["B17"].font = info_font

        # Add course details
        course_header_font = Font(size=10, bold=True)
        sheet["A19"] = "Course Code"
        sheet["B19"] = "Course Title"
        sheet["C19"] = "Units"
        sheet["D19"] = "Time"
        sheet["E19"] = "Day"
        sheet["F19"] = "Room"
        for col in ["A19", "B19", "C19", "D19", "E19", "F19"]:
            sheet[col].font = course_header_font

        row = 20
        for enrollment in enrollments_data:
            sheet[f"A{row}"] = enrollment['course']['code']
            sheet[f"B{row}"] = enrollment['course']['title']
            sheet[f"C{row}"] = enrollment['course']['lab_units'] + enrollment['course']['lec_units']
            sheet[f"D{row}"] = "TBA"
            sheet[f"E{row}"] = "TBA"
            sheet[f"F{row}"] = "TBA"
            row += 1

        # Add billing details
        billing_header_font = Font(size=10, bold=True)
        sheet[f"A{row + 1}"] = "Lab Fees"
        sheet[f"B{row + 1}"] = "Other Fees"
        sheet[f"C{row + 1}"] = "Assessment"
        sheet[f"D{row + 1}"] = "Payments"
        for col in [f"A{row + 1}", f"B{row + 1}", f"C{row + 1}", f"D{row + 1}"]:
            sheet[col].font = billing_header_font

        # Add billing data
        row += 2
        for billing in joined_data:
            sheet[f"A{row}"] = billing['billing_list']['name']
            sheet[f"B{row}"] = billing['billing_list']['price']
            row += 1

        # Add total billing price
        sheet[f"A{row + 1}"] = "Total Billing Price"
        sheet[f"B{row + 1}"] = total_acad_term_billings

        # Add receipt details
        receipt_header_font = Font(size=10, bold=True)
        sheet[f"A{row + 3}"] = "Receipts"
        sheet[f"A{row + 3}"].font = receipt_header_font

        row += 4
        for receipt in receipts_data:
            sheet[f"A{row}"] = receipt['date']
            sheet[f"B{row}"] = receipt['paid']
            row += 1

        # Save the file
        file_path = os.path.join(settings.MEDIA_ROOT, f"registration_form_{student_data['id']}.xlsx")
        wb.save(file_path)
        return file_path
    