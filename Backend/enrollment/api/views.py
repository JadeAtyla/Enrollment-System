from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.core.paginator import Paginator
from django.db.models import Q, Count
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
# from ..services.services import StudentService
# from ..validators.validators import RegistrationValidator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# import jwt, datetime
# import csv  # For exporting to Excel (CSV)
from django.db import IntegrityError
from .utils.permissions import *
from .custom_views.base_view import BaseView
from .models import *
from .serializers import *
from django.db import transaction
from .utils.services import StudentService
from api.utils.validators import EnrollmentValidator
from datetime import datetime
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import Group
from django.db.models import Sum

class AddressView(BaseView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = [GroupPermission]

class CourseView(BaseView):
    model = Course
    serializer_class = CourseSerializer
    permission_classes = [GroupPermission]

# Cadidate for changes
class EnrollmentView(BaseView):
    model = Enrollment
    serializer_class = EnrollmentSerializer
    permission_classes = [GroupPermission]

class GradeView(BaseView):
    model = Grade
    serializer_class = GradeSerializer
    permission_classes = [GroupPermission]

class InstructorView(BaseView):
    model = Instructor
    serializer_class = InstructorSerializer
    permission_classes = [GroupPermission]

class StudentView(BaseView):
    model = Student
    serializer_class = StudentSerializer
    permission_classes = [GroupPermission]

# Cadidate for removal
class ProgramView(BaseView):
    model = Program
    serializer_class = ProgramSerializer
    permission_classes = [GroupPermission]

class SectioningView(BaseView):
    model = Sectioning
    serializer_class = SectioningSerializer
    permission_classes = [GroupPermission]

class UserView(BaseView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [GroupPermission]
    
    def put(self, request, *args, **kwargs):
        # Extract data from the request
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        # Get the currently authenticated user
        user = request.user

        # Validate inputs
        if not old_password or not new_password or not confirm_password:
            return Response(
                {"error": "All fields (old_password, new_password, confirm_password) are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the old password is correct
        if not check_password(old_password, user.password):
            return Response(
                {"success": False, "error": "The old password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if new_password and confirm_password match
        if new_password != confirm_password:
            return Response(
                {"success": False, "error": "New password and confirm password do not match."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the new password is different from the old password
        if old_password == new_password:
            return Response(
                {"success": False, "error": "The new password cannot be the same as the old password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update the user's password
        user.password = make_password(new_password)
        user.save()

        return Response(
            {"success": True,"detail": "Password updated successfully."},
            status=status.HTTP_200_OK,
        )

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            
            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'detail': 'Logged in successfully', 'success': True}

            res.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.data.update(tokens)
            return res

        except Exception as e:
            print(e)
            return Response({'detail': 'Username or password is incorrect', 'success': False}, status=400)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            if not refresh_token:
                return Response({'detail': 'Refresh token is missing.'}, status=400)

            # Inject the refresh token from the cookie into the request data
            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            # Generate a new refresh token
            new_refresh_token = tokens.get('refresh', refresh_token)

            res = Response()
            res.data = {'refreshed': True}

            # Update access token cookie
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            # Update refresh token cookie
            res.set_cookie(
                key='refresh_token',
                value=new_refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.data.update(tokens)

            return res

        except Exception as e:
            print(e)
            return Response({'refreshed': False}, status=400)


# Register View
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Allow any user to register

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data, context={'request': request})
        try:
            if serializer.is_valid():
                # Create the user and return a success response
                user = serializer.save()
                return Response({
                    "success": True,
                    "message": f"User '{user.username}' registered successfully."
                }, status=status.HTTP_201_CREATED)

            # Return validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({
                'success': False,
                'message': f"Duplicate entry of account: {request.data['username']}"
            }, status=status.HTTP_400_BAD_REQUEST)


# Logout View
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication to log out

    def post(self, request, *args, **kwargs):
        try:
            res = Response()
            res.data = {'success': True, 'group': request.user.groups.values_list("name", flat=True).first().lower()}
            res.delete_cookie('access_token', path='/', samesite='None')
            res.delete_cookie('refresh_token', path='/', samesite='None')
            return res
        except Exception as e:
            print(e)
            return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)

class BaseUserView(CustomTokenObtainPairView):
    group_name = None  # To be set in subclasses

    def post(self, request, *args, **kwargs):
        # Authenticate user and get tokens
        response = super().post(request, *args, **kwargs)

        try:
            # Extract username and password from request
            username = request.data.get('username')
            password = request.data.get('password')

            # Authenticate user
            user = authenticate(request, username=username, password=password)

            if user is None:
                return Response({'success': False, 'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

            # Check if user belongs to the required group
            if not user.groups.filter(name=self.group_name).exists():
                return Response({
                    'success': False,
                    'detail': f"Unauthorized: User is not part of '{self.group_name}' group.",
                    'group': f"{user.groups.values_list("name", flat=True).first().lower()}"
                }, status=status.HTTP_403_FORBIDDEN)

            # Add a success message to the response
            response.data.update({
                'success': True,
                'detail': f"Logged in as {self.group_name} user.",
                'group': f"{self.group_name}"
            })

            return response

        except Exception as e:
            print(f"Error in BaseUserView: {e}")
            return Response({'success': False, 'detail': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

class RegistrarUserView(BaseUserView):
    group_name = "registrar"

class StudentUserView(BaseUserView):
    group_name = "student"

class DepartmentUserView(BaseUserView):
    group_name = "department"

class ProtectedGroupView(APIView):
    permission_classes = None  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        user_group = request.user.groups.values_list("name", flat=True).first().lower()

        return Response({
            'success': True, 
            'detail': f"Logged in as {user_group} user.",
            'group': f"{user_group}"
            })

class ProtectStudentView(ProtectedGroupView):
    permission_classes = [isStudent]

class ProtectDepartmentView(ProtectedGroupView):
    permission_classes = [isDepartment]

class ProtectRegistrarView(ProtectedGroupView):
    permission_classes = [isRegistrar]

class CORView(APIView):
    permission_classes = [isStudent]

    def get(self, request, *args, **kwargs):
        # Retrieve the authenticated user's student record
        try:
            student = Student.objects.get(id=request.user.username)
        except Student.DoesNotExist:
            return Response({"error": "Student information not found for the logged-in user."}, status=404)
        except Exception:
            return Response({"error": "User is not a student."}, status=400)

        # Serialize student data
        student_data = StudentSerializer(student).data

        # Fetch all enrollments for the student according to its present enrollment
        enrollments = Enrollment.objects.filter(student=student, school_year=student_data['academic_year'])
        enrollments_data = EnrollmentSerializer(enrollments, many=True).data

        # Fetch all BillingList items
        billing_list = BillingList.objects.all()

        # Annotate BillingList with related AcadTermBilling data (if exists) for the student's year level and semester
        joined_data = []
        for billing in billing_list:
            acad_term_billing = AcadTermBilling.objects.filter(
                billing=billing,
                year_level=student_data['year_level'],
                semester=student_data['semester']
            ).first()  # Use `first` to handle potential multiple matches (shouldn't occur due to unique constraint)

            joined_data.append({
                "billing_list": {
                    "name": billing.name,
                    "category": billing.category,
                    "price": acad_term_billing.price if acad_term_billing else None,
                    "year_level": acad_term_billing.year_level if acad_term_billing else None,
                    "semester": acad_term_billing.semester if acad_term_billing else None
                }
            })
        
        # Collects data that is needed for total
        billing_list = BillingList.objects.filter(category='ASSESSMENT')

        # Calculate total price of academic term billings
        total_acad_term_billings = AcadTermBilling.objects.filter(
            billing__in = billing_list,
            year_level=student_data['year_level'],
            semester=student_data['semester'], 
        ).aggregate(total_price=Sum('price'))['total_price'] or 0

        # Fetch all receipts for the student
        receipts = Receipt.objects.filter(student=student, school_year=student_data['academic_year'])
        receipts_data = ReceiptSerializer(receipts, many=True).data

        # Combine and return the response
        return Response({
            "student": student_data,
            "enrollments": enrollments_data,
            "acad_term_billings": joined_data,
            "total_acad_term_billing_price": total_acad_term_billings,
            "receipts": receipts_data
        })

    
class ChecklistView(APIView):
    permission_classes = [isStudent]  # Ensure the user is a student

    def get(self, request, *args, **kwargs):
        # Retrieve the authenticated user's student record
        try:
            student = Student.objects.get(id=request.user.username)
        except Student.DoesNotExist:
            return Response({"error": "Student information not found for the logged-in user."}, status=404)
        except Exception:
            return Response({"error": "User is not a student."}, status=400)
        
        # Get the student's program details
        program = student.program  # Assuming the student has a foreign key to Program

        # Get the courses that belong to the student's program
        courses = Course.objects.filter(program=program).prefetch_related(
            'grades'  # Fetch all related grades for each course
        ).all()

        # Create response data
        data = {
            "student": StudentSerializer(student).data,  # Serialize student data
            "courses_and_grades": []
        }

        # Go through each course and gather grade information
        for course in courses:
            # Try to get the grade for this course for the specific student
            grade = course.grades.filter(student=student).first()  # Get the first grade for the student in this course
            
            grade_data = {
                "course": {
                    "code": course.code,
                    "title": course.title,
                    "lab_units": course.lab_units,
                    "lec_units": course.lec_units,
                    "contact_hr_lab": course.contact_hr_lab,
                    "contact_hr_lec": course.contact_hr_lec,
                    "year_level": course.year_level,
                    "semester": course.semester,
                    "program": {  # Include program details for each course
                        "program_name": course.program.description,  # Adjust according to your Program model
                        "program_code": course.program.id,  # Adjust according to your Program model
                    }
                },
                "grade": grade.grade if grade else "No Grade",  # If no grade exists, show "No Grade"
                "remarks": grade.remarks if grade else "No Remarks"  # If no grade, show "No Remarks"
            }
            data["courses_and_grades"].append(grade_data)

        return Response(data)

class BatchEnrollStudentAPIView(APIView):
    def post(self, request):
        data = request.data

        # Extract data from the request
        student_id = data.get("student_id")
        course_ids = data.get("course_ids", [])  # List of course IDs
        paid_amount = data.get("paid")
        current_year = datetime.now().year
        acad_year = f"{current_year}-{current_year + 1}"

        if not course_ids:
            return Response(
                {"error": "No courses provided for enrollment"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Start transaction block
            with transaction.atomic():
                # Step 1: Retrieve Student
                student = Student.objects.get(id=student_id)

                # Validate student residency
                EnrollmentValidator.valid_residency(student.id)

                # Step 2: Process enrollments for all courses
                successful_enrollments = []
                errors = []  # Collect validation or course-related errors
                enrollment_date = None  # Store the enrollment date

                for course_id in course_ids:
                    try:
                        # Validate if the student can enroll in the course
                        EnrollmentValidator.valid_to_enroll_course(student.id, course_id)

                        # If validation succeeds, retrieve the course
                        course = Course.objects.get(id=course_id)

                        # Create the enrollment
                        enrollment = Enrollment.objects.create(
                            student=student,
                            course=course,
                            status="ENROLLED",
                            school_year=acad_year,
                        )
                        successful_enrollments.append(course_id)  # Append course_id to response

                        enrollment_date = enrollment.enrollment_date
                    except serializers.ValidationError as e:
                        # Add validation error to errors list
                        error_message = f"Course {course_id}: {str(e.detail['error'])}"
                        errors.append(error_message)
                    except Course.DoesNotExist:
                        # Add course not found error to errors list
                        error_message = f"Course {course_id}: Course not found."
                        errors.append(error_message)

                # Check for errors and return if any exist
                if errors:
                    raise serializers.ValidationError(
                        {
                            "message": "Some courses could not be enrolled.",
                            "errors": errors,  # List of all errors
                            "successful_enrollments": successful_enrollments,  # Successfully enrolled courses
                        }
                    )

                # Step 3: Update Student status
                student.year_level = StudentService.set_year_level(enrollment_date)
                student.academic_year = acad_year
                student.status = "REGULAR"
                student.save()

                # Step 4: Compute `total_amount` based on `AcadTermBilling`
                acad_term_billing = AcadTermBilling.objects.filter(
                    year_level=student.year_level,
                    semester=student.semester,
                )

                if not acad_term_billing:
                    # Billing information not found, raise an error and rollback
                    raise serializers.ValidationError(
                        {"error": "Billing information not found for the student's year level and semester."}
                    )
                
                # Calculate total price from academic term billings
                total_amount = acad_term_billing.aggregate(total_price=Sum('price'))['total_price'] or 0
                
                # Step 5: Create a Receipt
                remaining_balance = float(total_amount) - float(paid_amount)
                receipt = Receipt.objects.create(
                    student=student,
                    total=total_amount,
                    paid=paid_amount,
                    remaining=remaining_balance,
                    status="PENDING" if remaining_balance > 0 else "PAID",
                )

            # Success response
            return Response(
                {
                    "message": "Student enrolled successfully",
                    "enrollments": successful_enrollments,  # Return course_ids
                    "receipt_id": receipt.id,
                },
                status=status.HTTP_201_CREATED,
            )

        except Student.DoesNotExist:
            return Response(
                {"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except serializers.ValidationError as e:
            return Response(
                {"error": e.detail['error']},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
class DashboarView(APIView):
    permission_classes = [isRegistrar | isDepartment]

    def get(self, request):
        # Serialize user data
        user = UserSerializer(request.user).data

        # Base counts
        total_students = Student.objects.count()

        # Dynamic filters for statuses
        statuses = ["REGULAR", "IRREGULAR", "RETURNEE", "TRANSFEREE"]
        status_counts = {f"{status.lower()}_students": Student.objects.filter(status=status).count() for status in statuses}

        # Dynamic filters for programs
        programs = ["BSCS", "BSIT"]
        program_counts = {f"{program.lower()}_students": Student.objects.filter(program=program).count() for program in programs}

        # Dynamic filters for year levels per program
        year_name = ["first", "second", "third", "fourth"]
        year_level_counts = {}
        for program in programs:
            for year in range(1, 5):  # Year levels 1 to 4
                key = f"{program.lower()}_{year_name[year - 1]}_year_students"
                year_level_counts[key] = Student.objects.filter(program=program, year_level=year).count()

        # Combine results
        response_data = {
            "user": user,
            "dashboard": {
                "total_students": total_students,
                **status_counts,
                **program_counts,
                **year_level_counts,
            }
        }

        return Response(response_data, status=200)