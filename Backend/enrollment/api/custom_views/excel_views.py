from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.http import HttpResponse
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
        #Handles the upload and processing of Excel files for students.
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
        #Handles the upload and processing of Excel files for billing.
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

# Output Excel Format for CheckList
def create_checklist_excel(student_id, output_file):
    # Fetch student data
    try:
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        raise ValueError("Student not found.")
    
    # Create a workbook and a worksheet
    wb = Workbook()
    ws = wb.active
    ws.title = "Checklist Report"

    # Define styles
    bold_font = Font(bold=True)
    center_align = Alignment(horizontal="center", vertical="center")
    thin_border = Border(
        left=Side(style="thin"), right=Side(style="thin"),
        top=Side(style="thin"), bottom=Side(style="thin")
    )
    yellow_fill = PatternFill(start_color="FFFF99", end_color="FFFF99", fill_type="solid")

    # header information (student details)
    ws["A1"] = "Name:"
    ws["B1"] = f"{student.last_name}, {student.first_name} {student.middle_name or ''}"

    ws["A2"] = "Student Number:"
    ws["B2"] = student.id

    ws["A3"] = "Address:"
    address = student.address
    ws["B3"] = f"{address.street}, {address.barangay}, {address.city}, {address.province}"

    ws["D1"] = "Year Level:"
    ws["E1"] = student.year_level

    ws["D2"] = "Semester:"
    ws["E2"] = student.semester

    ws["A1"].font = bold_font
    ws["A2"].font = bold_font
    ws["A3"].font = bold_font
    ws["D1"].font = bold_font
    ws["D2"].font = bold_font

    # Merge cells for the title
    ws.merge_cells("A5:E5")
    ws["A5"] = f"Checklist for AY {student.academic_year} - Semester {student.semester}"
    ws["A5"].font = Font(bold=True, size=14)
    ws["A5"].alignment = center_align

    # Create table headers
    headers = ["COURSE CODE", "COURSE TITLE", "GRADE", "STATUS", "REMARKS"]
    ws.append(headers)

    # Apply header styles
    for col_num, header in enumerate(headers, start=1):
        cell = ws.cell(row=6, column=col_num)
        cell.font = bold_font
        cell.alignment = center_align
        cell.fill = yellow_fill
        cell.border = thin_border

    # Fetch and populate course and grade details
    row_num = 7
    grades = Grade.objects.filter(student=student).select_related('course', 'instructor')

    for grade in grades:
        course = grade.course
        ws.cell(row=row_num, column=1, value=course.code).border = thin_border
        ws.cell(row=row_num, column=2, value=course.title).border = thin_border
        ws.cell(row=row_num, column=3, value=grade.grade).border = thin_border
        ws.cell(row=row_num, column=4, value=grade.remarks).border = thin_border
        ws.cell(row=row_num, column=5, value=grade.instructor.first_name + " " + grade.instructor.last_name).border = thin_border
        row_num += 1

    # Adjust column widths
    for col in ws.columns:
        max_length = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            if cell.value:
                max_length = max(max_length, len(str(cell.value)))
        adjusted_width = max_length + 2
        ws.column_dimensions[col_letter].width = adjusted_width

    # Save the workbook
    wb.save(output_file)

# Output Excel Format for COR
def generate_registration_form(student_id):
    # Fetch the student data (adjust according to your model)
    student = Student.objects.get(id=student_id)
    address = student.address

    # Create a workbook and sheet
    wb = Workbook()
    sheet = wb.active
    sheet.title = "Registration Form"

    # Add an image to the workbook
    logo_path = os.path.join(settings.BASE_DIR, 'static/images/logo.png')  # Adjust the path
    if os.path.exists(logo_path):
        img = Image(logo_path)
        img.width, img.height = 150, 75  # Resize the image if needed
        sheet.add_image(img, "A1")  # Position the image at cell A1

    # Example: Add header information
    sheet["A6"] = "CAVITE STATE UNIVERSITY - Bacoor Campus"
    sheet["A7"] = "REGISTRATION FORM"

    # Add student information
    sheet["A9"] = "Student Number:"
    sheet["B9"] = student.id

    sheet["A10"] = "Student Name:"
    sheet["B10"] = f"{student.last_name}, {student.first_name} {student.middle_name or ''}"

    sheet["A11"] = "Address:"
    sheet["B11"] = f"{address.street}, {address.barangay}, {address.city}, {address.province}"

    # Example: Add course details
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
        sheet[f"D{row}"] = "MILF"  # Example static value
        sheet[f"E{row}"] = "6:90 AM - 69:69 AM"  # Example static value
        sheet[f"F{row}"] = "Room 69"  # Example static value
        row += 1

    # Save the file locally (or return as a response in an API)
    file_path = os.path.join(settings.MEDIA_ROOT, f"registration_form_{student_id}.xlsx")
    wb.save(file_path)
    return file_path
