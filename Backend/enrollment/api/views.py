from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import *
from .forms import (
    AddressForm, CourseForm, EnrollmentForm, GradeForm, PreRequisiteForm,
    InstructorForm, Billing, ScheduleForm, StudentForm, UserForm
)
from .models import (
    Address, Course, Enrollment, Grade, Instructor, Billing, Schedule, PreRequisite,
    Student
)
from datetime import datetime
from django.http import JsonResponse# for Json responses
from django.shortcuts import get_object_or_404 
from django.core.paginator import Paginator
import csv  # For exporting to Excel (CSV)

from django.contrib.auth import authenticate

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
import json


# # Create your views here to render in the frontend.
# def index(request):
#     account = Account.objects.all() # retrive all data from the table
#     context={
#         'account': account # key: value
#     }
#     return render(request, 'index.html', context) # request, redering file, content (for html ready)

class AddressListView(APIView):
    def get(self, request):
        addresses = Address.objects.all()
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)

class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class EnrollmentListView(APIView):
    def get(self, request):
        enrollments = Enrollment.objects.all()
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)

class GradeListView(APIView):
    def get(self, request):
        grades = Grade.objects.all()
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)

class InstructorListView(APIView):
    def get(self, request):
        instructors = Instructor.objects.all()
        serializer = InstructorSerializer(instructors, many=True)
        return Response(serializer.data)

class ScheduleListView(APIView):
    def get(self, request):
        schedules = Schedule.objects.all()
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data)

class StudentListView(APIView):
    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

class BillingListView(APIView):
    def get(self, request):
        billings = Billing.objects.all()
        serializer = BillingSerializer(billings, many=True)
        return Response(serializer.data)

class PreRequisiteListView(APIView):
    def get(self, request):
        pre_requisites = PreRequisite.objects.all()
        serializer = PreRequisiteSerializer(pre_requisites, many=True)
        return Response(serializer.data)

class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

# Register View: Handle user registration
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


# Custom Token Obtain Pair View: Handle login and cookie setting
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success': True}

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
            return Response({'success': False}, status=400)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            if not refresh_token:
                return Response({'detail': 'Refresh token is missing.'}, status=400)

            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )
            return res

        except Exception as e:
            print(e)
            return Response({'refreshed': False}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response()
        res.data = {'success': True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except Exception as e:
        print(e)
        return Response({'success': False}, status=400)
 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_courses_by_program(request, program_id):
    program = get_object_or_404(Course, pk=program_id) 
    courses = Course.objects.filter(program=program)  
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_student(request, student_id, course_code):
    student = get_object_or_404(Student, pk=student_id)  
    course = get_object_or_404(Course, code=course_code) 

    if Enrollment.objects.filter(student=student, course_code=course).exists():
        return Response({'detail': 'Student is already enrolled in this course.'}, status=400)

    enrollment = Enrollment(
        student=student,
        course_code=course,
        enrollment_date=datetime.now(),
        status='enrolled',
        school_year=datetime.now().year,
    )
    enrollment.save()

    return Response({'detail': 'Student successfully enrolled in the course.'})

class CourseAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view.

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        serializer = CourseSerializer(course, data=request.data, partial=True)  # Use `partial=True` for partial updates
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    # Delete a course by ID
    def delete(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        course.delete()
        return Response({'success': True, 'message': 'Course deleted successfully'}, status=status.HTTP_200_OK)

# HANDLER OF FORMS  
@api_view(['POST'])
def generic_form_api_view(request, form_class, instance=None):
    """
    A reusable API view for handling forms.

    :param request: The HTTP request object (expects JSON data).
    :param form_class: The form class to use for this view.
    :param instance: An optional model instance for updating existing data (if editing).
    :return: JSON response indicating success or failure.
    """
    if request.method == 'POST':
        # Bind form with POST data (and optionally an instance for updates).
        form = form_class(request.data, instance=instance)  # Use request.data for JSON input
        
        if form.is_valid():
            form.save()
            return Response({'message': 'Form submitted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': form.errors}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Invalid method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# Validation During Course Enrollment
def check_prerequisites(student, course):
    # Get the prerequisites for the given course
    prerequisites = PreRequisite.objects.filter(course=course)
    
    # If there are no prerequisites, the course can be taken freely
    if not prerequisites.exists():
        return True
    
    # Check if the student has completed all required prerequisites
    for prereq in prerequisites:
        # Check if the student has a grade for the prerequisite course
        grade = Grade.objects.filter(student=student, course=prereq.pre_requisite).first()
        
        # If the student has no grade or the grade is not passing, return False
        if not grade or grade.grade not in ['1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00']:
            return False  # The student hasn't completed the prerequisite with a passing grade
    
    # If all prerequisites are met
    return True


# LIST View Funtions

def generalized_list_view(
    request,
    model,
    search_fields=None,
    filter_fields=None,
    export_headers=None,
    export_fields=None,
):
    """
    Generalized list view for any model.

    :param request: The HTTP request object.
    :param model: The Django model to query.
    :param search_fields: Fields to search for (list of field names).
    :param filter_fields: Fields to filter by (dict of field name -> query parameter key).
    :param export_headers: Headers for the CSV export.
    :param export_fields: Fields to include in the CSV export.
    """
    # Querying the model
    queryset = model.objects.all()

    # Handling search
    search_query = request.GET.get('search', '')
    if search_query and search_fields:
        search_conditions = Q()
        for field in search_fields:
            search_conditions |= Q(**{f"{field}__icontains": search_query})
        queryset = queryset.filter(search_conditions)

    # Handling filters
    if filter_fields:
        for field, param in filter_fields.items():
            value = request.GET.get(param, '')
            if value:
                queryset = queryset.filter(**{field: value})

    # Pagination
    page_number = request.GET.get('page', 1)
    paginator = Paginator(queryset, 10)
    page_obj = paginator.get_page(page_number)

    if 'export' in request.GET and export_headers and export_fields:
    # Generate CSV response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{model._meta.model_name}_list.csv"'

        writer = csv.writer(response)
        writer.writerow(export_headers)  # Write headers first

    # Preparing data for response
    data = []
    for obj in page_obj:
        if export_fields:
            record = {}
            for field in export_fields:
                if '.' in field:
                    related_field, sub_field = field.split('.', 1)
                    value = getattr(getattr(obj, related_field, None), sub_field, '')
                elif isinstance(field, tuple):  # Special case for multiple fields in one column
                    related_obj = getattr(obj, field[0], None)
                    value = f"{getattr(related_obj, field[1], '')} {getattr(related_obj, field[2], '')}".strip()
                else:
                    value = getattr(obj, field, '')
                record[field] = value
            data.append(record)

    # Response data
    response_data = {
        'data': data,
        'pagination': {
            'current_page': page_obj.number,
            'total_pages': paginator.num_pages,
            'total_items': paginator.count,
        },
    }

    return JsonResponse(response_data)

def student_list_view(request):
    return generalized_list_view(
        request,
        model=Student,
        search_fields=['first_name', 'last_name'],
        filter_fields={'year_level': 'year_level', 'program': 'course'},  
        export_headers=[
            'Student Number', 
            'Student Name', 
            'Program', 
            'Year Level', 
            'Section', 
            'Status'
            ],
        export_fields=[
            'id', 
            'full_name', 
            'program', 
            'year_level', 
            'section', 
            'status'
            ]

    )

def schedule_list_view(request):
    return generalized_list_view(
        request,
        model=Schedule, 
        search_fields=['course__code'],
        filter_fields={
            'course__program': 'program',
            'year_level': 'year_level',
        },
        export_headers=[
            'Course Code', 'Year Level', 'Section', 'Day', 'From Time',
            'To Time', 'Room', 'Program', 'Instructor'
        ],
        export_fields=[
            'course.code',
            'year_level',
            'section',
            'day',
            'from_time',
            'to_time',
            'room',
            'course.program',
            'instructor.full_name',  
        ]

    )

def enrollment_list_view(request):
    return generalized_list_view(
        request,
        model=Enrollment,
        search_fields=['student__first_name', 'student__last_name'],
        filter_fields={
            'student__year_level': 'year_level',
            'course__code': 'course',
        },
        export_headers=[
            'Student Number', 'Student Name', 'Program', 'Year Level', 
            'Section', 'Status', 'Enrollment Status'
        ],
        export_fields=[
            'student.id',
            'student.full_name', 
            'student.program',
            'student.year_level',
            'student.section',
            'student.status',
            'status' 
        ]
    )

def instructor_list_view(request):
    return generalized_list_view(
        request,
        model=Instructor,
        search_fields=['first_name', 'last_name'],  # Search by first and last name
        filter_fields={},  # Add filters if needed
        export_headers=[
            'Instructor ID', 
            'Instructor Name', 
            'Email', 
            'Contact No.', 
            'Address'
            ],
        export_fields=[
            'id', 
            'full_name', 
            'email', 
            'contact_number', 
            'address'
            ]
    )

# Student Log in
@api_view(['POST'])
def login_user(request):
    username = request.data.get('student_number')  # Assuming student number is the username
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Both fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        request.session['student_id'] = user.id  # Store student ID in the session
        return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

# Student Dashboard
@api_view(['GET'])
def get_student_data(request):
    student_id = request.session.get("student_id")
    if not student_id:
        return Response({"error": "Unauthorized"}, status=401)

    try:
        student = Student.objects.get(id=student_id)
        data = {
            "first_name": student.first_name,
            "last_name": student.last_name,
            "program": student.program,
            "student_id": student.id,
            "enrollment_status": "Enrolled" if student.status == "active" else "Not Enrolled",
            "category": student.category,
        }
        return Response(data)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

@login_required
def get_student_profile(request):
    # Get logged-in student information
    try:
        student = Student.objects.get(id=request.user.id)
        data = {
            "student_number": student.id,
            "email": student.email,
            "status": student.status,
            "contact_number": student.contact_number,
            "program": student.program,
            "year_level": student.year_level,
            "section": student.section,
        }
        return JsonResponse(data, status=200)
    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)

@csrf_exempt
def change_password(request):
    """
    Handle password change requests.

    Accepts a POST request with the current_password, new_password, and confirm_password.
    """
    if request.method == "POST":
        try:
            # Parse the JSON body
            data = json.loads(request.body)
            current_password = data.get("current_password")
            new_password = data.get("new_password")
            confirm_password = data.get("confirm_password")

            # Validate the input
            if not current_password or not new_password or not confirm_password:
                return JsonResponse({"error": "All fields are required."}, status=400)

            if new_password != confirm_password:
                return JsonResponse({"error": "New passwords do not match."}, status=400)

            # Authenticate the user
            user = request.user
            if not user.is_authenticated:
                return JsonResponse({"error": "User is not authenticated."}, status=403)

            if not user.check_password(current_password):
                return JsonResponse({"error": "Current password is incorrect."}, status=400)

            # Update the password
            user.set_password(new_password)
            user.save()

            return JsonResponse({"success": "Password updated successfully."}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)

@login_required
def get_user_profile(request):
    """
    API to fetch user profile 
    """
    try:
        user = request.user
        student = Student.objects.get(id=user.id)  
        address = student.address

        profile_data = {
            "last_name": student.last_name,
            "first_name": student.first_name,
            "middle_name": student.middle_name,
            "suffix": student.suffix,
            "address": {
                "street": address.street,
                "barangay": address.barangay,
                "city": address.city,
                "province": address.province,
            },
            "gender": student.gender,
            "birthday": student.date_of_birth,
        }
        return JsonResponse({"data": profile_data}, status=200)

    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found."}, status=404)

