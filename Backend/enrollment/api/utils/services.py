from django.contrib.auth.models import User
from ..enums import STUDENT_CATEGORY, STUDENT_REG_STATUS, PAYMENT_STATUS, PROGRAM, GRADE_REMARKS
from django.db.models import Sum
from rest_framework.exceptions import NotFound
from ..models import Enrollment, Student, Course, Receipt, AcadTermBilling, BillingList, Grade
from django.utils import timezone
from datetime import datetime
from django.db import transaction
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist, ValidationError
import pandas as pd
from abc import ABC, abstractmethod
from django.http import HttpResponse
from .validators import StudentNumberValidator, LengthValidator
from rest_framework import serializers
from api.models import Student, Program, Course, Enrollment, Grade
from collections import Counter

class CalculateService:
    @staticmethod
    def get_total(data: list):
        return sum(data)
    
# class FetchDataService:
#     def __init__(self, model):
#         self.model = model

#     @staticmethod
#     def get_by_id(self, id):
#         try:
#             return self.model.objects.get(id=id)
#         except self.model.DoesNotExist:
#             raise NotFound(detail=f"{self.model.__name__} with ID {id} does not exist.")
        
#     @staticmethod
#     def get_by_field(self, field, value):
#         try:
#             return self.model.objects.get(**{field: value})
#         except self.model.DoesNotExist:
#             raise NotFound(detail=f"{self.model.__name__} with {field} '{value}' does not exist.")
    
#     @staticmethod
#     def get_all(self):
#         return self.model.objects.all()

class StudentService:
    # @staticmethod
    # def is_student_registered(student_id: int):
    #     #Checks if the student with the given ID is registered
    #     return User.objects.filter(username=student_id).exists()
    # @staticmethod
    # def set_year_level(enrollment_date: str):
    #     # Retrieve year_level values for the given academic year
    #     year_levels = Enrollment.objects.filter(enrollment_date=enrollment_date).values_list('year_level_taken', flat=True)
        
    #     if not year_levels:
    #         return None  # Handle the case where no year_levels are found

    #     # Count the occurrences of each year_level
    #     year_level_counts = Counter(year_levels)
        
    #     # Find the year_level with the highest frequency
    #     most_common_year_level = year_level_counts.most_common(1)  # Get the most common year_level
    #     return most_common_year_level[0][0]  # Return the year_level value

    @staticmethod
    def set_category(year_level: int):
        """
        Determines the student's category based on their year level.
        """
        try:
            return STUDENT_CATEGORY.NEW if year_level <= 1 else STUDENT_CATEGORY.OLD
        except Exception as e:
            raise e

    @staticmethod
    def set_program(student_id: int):
        """
        Sets the program of the student based on the student number's middle digits.
        """
        try:
            # Validate the student number length
            LengthValidator.validate_length(student_id, 9)

            # Validate the student number and get the program code
            program_code = StudentNumberValidator.validate_program(student_id)

            # Determine the program based on the program code
            program = 'BSIT' if program_code else 'BSCS'
            return Program.objects.get(id=program)
        except serializers.ValidationError as e:
            raise e  # Re-raise for handling by the caller


    @staticmethod
    def set_status(student_id: int):
        """
        Determines the student's registration status (REGULAR or IRREGULAR),
        considering the student's program, year level, and semester.
        """
        try:
            # Fetch the student's program
            student = Student.objects.get(id=student_id)
            student_program = student.program
            year_level = student.year_level
            semester = student.semester

            # Get all courses required for the given year level, semester, and program
            curriculum_courses = Course.objects.filter(
                year_level=year_level, semester=semester, program=student_program
            ).values_list("code", flat=True)

            # Get all courses the student is currently enrolled in
            enrolled_courses = Enrollment.objects.filter(
                student_id=student_id, year_level_taken=year_level, semester_taken=semester
            ).values_list("course", flat=True)
            
            # Compare curriculum courses to enrolled courses
            return "REGULAR" if set(curriculum_courses) == set(enrolled_courses) else "IRREGULAR"

        except Student.DoesNotExist:
            raise ValidationError({"error": "Student does not exist."})
        except Course.DoesNotExist:
            raise ValidationError({"error": "Invalid year level, semester, or program."})
        except Enrollment.DoesNotExist:
            raise ValidationError({"error": "Student is not enrolled in any courses."})
        except ObjectDoesNotExist:
            raise ValidationError("The specified student or course does not exist.")

class EnrollmentService:

    @staticmethod
    def is_eligible_to_enroll(student_id, course_id) -> bool:
        """
        Check if a student is eligible to enroll in a given course.
        Eligibility is based on grade remarks (must be 'PASSED').
        """
        try:
            # Fetch grade for the specific student and course
            grade = Grade.objects.get(student=student_id, course=course_id)
            return grade.remarks == 'PASSED'
        except Grade.DoesNotExist:
            return False

    @staticmethod
    def get_courses_to_enroll(student_id) -> Course:
        """
        Retrieve courses available for enrollment for a student.
        Filters out already passed courses and courses above the year level.
        """
        try:
            student = Student.objects.get(id=student_id)
            year_level = student.year_level

            # Courses the student has already passed
            passed_courses = Grade.objects.filter(
                student=student, remarks="PASSED"
            ).values_list('course_id', flat=True)

            # Return courses below or equal to student's year_level and not already passed
            return Course.objects.filter(year_level__lte=year_level).exclude(id__in=passed_courses)

        except Student.DoesNotExist:
            raise ValidationError({"error": "Student does not exist."})

    @staticmethod
    def enroll_student(student_id, course_id):
        """
        Enroll a student into a course if they meet the eligibility requirements.
        """
        try:
            # Step 1: Check if student exists
            student = Student.objects.get(id=student_id)

            # Step 2: Check if the course is available for enrollment
            valid_courses = EnrollmentService.get_courses_to_enroll(student_id)
            if not valid_courses.filter(id=course_id).exists():
                raise ValidationError({"error": "Course is not available for enrollment."})

            # Step 3: Check eligibility (pre-requisites)
            if not EnrollmentService.is_eligible_to_enroll(student_id, course_id):
                raise ValidationError({"error": "Student has not passed the pre-requisite course."})

            # Step 4: Create enrollment record
            current_year = datetime.now().year
            academic_year = f"{current_year}-{current_year + 1}"
            course = Course.objects.get(id=course_id)

            Enrollment.objects.create(
                student=student,
                course=course,
                school_year=academic_year,
                status="ENROLLED",
            )

            return {"success": f"Student {student_id} successfully enrolled in course {course_id}."}

        except Student.DoesNotExist:
            raise ValidationError({"error": "Student does not exist."})
        except Course.DoesNotExist:
            raise ValidationError({"error": "Course does not exist."})
        except ValidationError as e:
            raise e
        except Exception as e:
            return {"error": f"An unexpected error occurred: {str(e)}"}

class GradeService:
    @staticmethod
    def set_remarks(grade: float) -> str:
       # Determine the remarks based on the grade
        if grade:  # Ensure grade is not null or empty
            try:
                grade_value = float(grade)  # Attempt to convert the grade to a float
            except ValueError:
                grade_value = None  # If conversion fails (e.g., "INC" or "DRP")

            # Assign remarks based on the grade or specific cases
            if grade_value is not None:  # Grade is numeric
                if grade_value <= 3.0:  # Passed (1.0 to 3.0)
                    return GRADE_REMARKS.PASSED
                elif grade_value == 4.0:  # Conditional failure (4.0)
                    return GRADE_REMARKS.CONDITIONAL_FAILURE
                elif grade_value >= 5.0:  # Failed (5.0 and above)
                    return GRADE_REMARKS.FAILED
            else:  # Grade is non-numeric
                if grade == 'S':  # Passed (Special grade "S")
                    return GRADE_REMARKS.PASSED
                elif grade == 'INC':  # Incomplete
                    return GRADE_REMARKS.INCOMPLETE
                elif grade == 'DRP':  # Dropped subject
                    return GRADE_REMARKS.DROPPED_SUBJECT
                elif grade in ['0', None]:  # Not graded yet (0 or null)
                    return GRADE_REMARKS.NOT_GRADED_YET
                else:
                    return None  # Default case        
# Pending Funtions must be reviewed
# class BillingService:
#     @staticmethod
#     def generate_billing(student_id: int, course_id: int) -> AcadTermBilling:
#         """
#         Generate a billing entry for a student based on the selected course.
#         """
#         try:
#             # Fetch the student and course details
#             student = Student.objects.get(id=student_id)
#             course = Course.objects.get(id=course_id)

#             # Calculate the billing amount (assuming it's based on the course fee)
#             course_fee = course.fee  # Ensure 'fee' is a field in the Course model
#             current_academic_year = BillingService.get_current_academic_year()
            
#             # Create or update the billing record
#             billing, created = AcadTermBilling.objects.get_or_create(
#                 student=student,
#                 academic_year=current_academic_year,
#                 defaults={"total_amount": course_fee, "balance": course_fee},
#             )
            
#             # Add the course to the billing list
#             BillingList.objects.create(billing=billing, course=course, amount=course_fee)

#             # Update the balance if it's an existing billing
#             if not created:
#                 billing.balance += course_fee
#                 billing.total_amount += course_fee
#                 billing.save()

#             return billing
#         except Student.DoesNotExist:
#             raise ValidationError({"error": "Student does not exist."})
#         except Course.DoesNotExist:
#             raise ValidationError({"error": "Course does not exist."})

#     @staticmethod
#     def generate_receipt(student_id: int, amount_paid: float) -> Receipt:
#         """
#         Generate a receipt for the student's payment.
#         """
#         try:
#             student = Student.objects.get(id=student_id)
#             current_academic_year = BillingService.get_current_academic_year()

#             # Fetch the student's billing record
#             billing = AcadTermBilling.objects.get(student=student, academic_year=current_academic_year)

#             if amount_paid > billing.balance:
#                 raise ValidationError({"error": "Payment amount exceeds the outstanding balance."})

#             # Create a receipt
#             receipt = Receipt.objects.create(
#                 student=student,
#                 amount=amount_paid,
#                 status=PAYMENT_STATUS.PAID,
#                 issued_date=timezone.now(),
#             )

#             # Deduct the payment amount from the billing balance
#             billing.balance -= amount_paid
#             billing.save()

#             return receipt
#         except Student.DoesNotExist:
#             raise ValidationError({"error": "Student does not exist."})
#         except AcadTermBilling.DoesNotExist:
#             raise ValidationError({"error": "Billing record does not exist."})

#     @staticmethod
#     def enroll_on_success(student_id: int, course_id: int) -> Enrollment:
#         """
#         Enroll the student in the course upon successful receipt generation.
#         """
#         with transaction.atomic():
#             # Generate the billing and receipt
#             billing = BillingService.generate_billing(student_id, course_id)
#             course = Course.objects.get(id=course_id)
#             receipt = BillingService.generate_receipt(student_id, course.fee)

#             # If payment is successful, enroll the student
#             if receipt.status == PAYMENT_STATUS.PAID:
#                 current_academic_year = BillingService.get_current_academic_year()

#                 enrollment, created = Enrollment.objects.get_or_create(
#                     student_id=student_id,
#                     course_id=course_id,
#                     defaults={"academic_year": current_academic_year},
#                 )

#                 if created:
#                     return enrollment
#                 else:
#                     raise ValidationError({"error": "Student is already enrolled in this course."})
#             else:
#                 raise ValidationError({"error": "Payment was not successful. Enrollment failed."})

#     @staticmethod
#     def get_current_academic_year() -> str:
#         """
#         Get the current academic year based on the current date.
#         """
#         current_year = timezone.now().year
#         next_year = current_year + 1
#         return f"{current_year}-{next_year}"

class EnrollmentService:
    pass

# Class for Excel Operations
class ExcelProcessor(ABC):
    @abstractmethod
    def read(self, file_path):
        pass

    @abstractmethod
    def process(self, data):
        pass

    @abstractmethod
    def export(self, queryset):
        pass


# Concrete Implementation for Students
class StudentExcelService(ExcelProcessor):
    def read(self, file_path):
       # Reads Excel data for students and returns a DataFrame.
        return pd.read_excel(file_path, engine="openpyxl")

    def process(self, data):
        #Processes Excel data and creates Student objects.
        students = []
        for _, row in data.iterrows():
            student = Student(
                id=row['id'],
                first_name=row['first_name'],
                last_name=row['last_name'],
                email=row['email'],
                contact_number=row['contact_number'],
                program_id=row['program'],  # Foreign key to Program
                gender=row['gender'],
                year_level=row['year_level'],
                status=row['status']
            )
            students.append(student)
        Student.objects.bulk_create(students, ignore_conflicts=True)
        return f"Successfully processed {len(students)} students."

    def export(self, queryset):
        #Exports Student objects to an Excel file.
        data = list(queryset.values(
            'id', 'first_name', 'last_name', 'email',
            'contact_number', 'program_id', 'gender',
            'year_level', 'status'
        ))
        df = pd.DataFrame(data)
        response = HttpResponse(
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response['Content-Disposition'] = 'attachment; filename="students.xlsx"'
        df.to_excel(response, index=False, engine="openpyxl")
        return response


# Concrete Implementation for Billing
class BillingExcelService(ExcelProcessor):
    def read(self, file_path):
        #Reads Excel data for billing and returns a DataFrame.
        return pd.read_excel(file_path, engine="openpyxl")

    def process(self, data):
        #Processes Excel data and creates Billing objects.
        billings = []
        for _, row in data.iterrows():
            billing = AcadTermBilling(
                billing_id=row['billing_id'], 
                price=row['price'],
                year_level=row['year_level'],
                semester=row['semester']
            )
            billings.append(billing)
        AcadTermBilling.objects.bulk_create(billings, ignore_conflicts=True)
        return f"Successfully processed {len(billings)} billing records."

    def export(self, queryset):
        #Exports Billing objects to an Excel file.
        data = list(queryset.values(
            'billing_id', 'price', 'year_level', 'semester'
        ))
        df = pd.DataFrame(data)
        response = HttpResponse(
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response['Content-Disposition'] = 'attachment; filename="billing.xlsx"'
        df.to_excel(response, index=False, engine="openpyxl")
        return response
