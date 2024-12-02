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
def generic_form_view(request, form_class, template_name, success_url=None):
    submitted = False
    if request.method == "POST":
        form = form_class(request.POST)
        if form.is_valid():
            form.save()
            if success_url is None:
                success_url = request.path + "?submitted=True"
            return HttpResponseRedirect(success_url)
    else:
        form = form_class()
        if 'submitted' in request.GET:
            submitted = True
    return render(request, template_name, {'form': form, 'submitted': submitted})

# Validation During Course Enrollment
def check_prerequisites(student, course):
    prerequisites = PreRequisite.objects.filter(course=course)
    for prereq in prerequisites:
        if not student.courses_completed.filter(id=prereq.pre_requisite.id).exists():
            return False
    return True

# LIST View Funtions
def enrollment_list_view(request):
    # Get all students from DB
    enrollment = Enrollment.objects.all()

    # Search and filter functionality
    search_query = request.GET.get('search', '')
    year_level = request.GET.get('year_level', '')
    course = request.GET.get('course', '')

    if search_query:
        enrollment = student.filter(
            Q(first_name__icontains=search_query) | Q(last_name__icontains=search_query)
        )
    
    if year_level:
        enrollment = student.filter(year_level=year_level)
    
    if course:
        enrollment = student.filter(program=course)  # Filter by program (course)

    paginator = Paginator(enrollment, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # Export to Excel (CSV)
    if 'export' in request.GET:
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="enrollment_list.csv"'

        writer = csv.writer(response)
        writer.writerow(['Student Number', 'Student Name', 'Program', 'Year Level', 'Section', 'Status', 'Enrollment Status'])
        for student in enrollment:
            writer.writerow([
                student.id,
                f'{student.first_name} {student.last_name}',  # Combine first and last name
                student.program,
                student.year_level,
                student.section,
                student.status,
                student.enrollment_status  # Assuming this field exists
            ])

        return response

    return render(request, 'enrollment_list.html', {
        'page_obj': page_obj,  # For pagination
        'search_query': search_query,
        'year_level': year_level,
        'course': course,
    })  

def instructor_list_view(request):
    # Get all instructors from DB
    instructors = Instructor.objects.all()

    search_query = request.GET.get('search', '')
    if search_query:
        instructors = instructors.filter(
            Q(first_name__icontains=search_query) | Q(last_name__icontains=search_query)
        )

    paginator = Paginator(instructors, 10) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # Export to Excel (CSV)
    if 'export' in request.GET:
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="instructor_list.csv"'

        writer = csv.writer(response)
        writer.writerow(['Instructor ID', 'Instructor Name', 'Email', 'Contact No.', 'Address'])
        for instructor in instructors:
            writer.writerow([
                instructor.id,
                f'{instructor.first_name} {instructor.last_name}', 
                instructor.email,
                instructor.contact_number,
                f'{instructor.address.street}, {instructor.address.barangay}, {instructor.address.city}, {instructor.address.province}'  # Format address
            ])

        return response

    # Render the template
    return render(request, 'instructor_list.html', {
        'page_obj': page_obj,
        'search_query': search_query,
    })

def schedule_list_view(request):
    # Get all schedules from DB
    schedules = Schedule.objects.select_related('course', 'instructor').all()

    search_query = request.GET.get('search', '')
    program_filter = request.GET.get('program', '')
    year_level_filter = request.GET.get('year_level', '')

    if search_query:
        schedules = schedules.filter(course__code__icontains=search_query)
    if program_filter:
        schedules = schedules.filter(course__program=program_filter)
    if year_level_filter:
        schedules = schedules.filter(year_level=year_level_filter)

    paginator = Paginator(schedules, 10) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    #Export to Excel (CSV)
    if 'export' in request.GET:
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="schedule_list.csv"'

        writer = csv.writer(response)
        writer.writerow(['Course Code', 'Year Level', 'Section', 'Day', 'From Time', 'To Time', 'Room', 'Program', 'Instructor'])
        for schedule in schedules:
            writer.writerow([
                schedule.course.code,
                schedule.year_level,
                schedule.section,
                schedule.day,
                schedule.from_time,
                schedule.to_time,
                schedule.room,
                schedule.course.program,
                f"{schedule.instructor.first_name} {schedule.instructor.last_name}" 
            ])

        return response

    # Render the template
    return render(request, 'schedule_list.html', {
        'page_obj': page_obj,
        'search_query': search_query,
        'program_filter': program_filter,
        'year_level_filter': year_level_filter,
    })
