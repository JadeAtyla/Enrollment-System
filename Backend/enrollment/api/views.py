from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
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




# STUDENT FORM
def student_form(request):
    submitted = False
    if request.method == "POST":
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/student_form?submitted=True')
    else:
        form = StudentForm
        if 'submitted' in request.GET:
            submitted = True
    return render(request, 'enrollment/student_form.html', {'form':form , 'submitted':submitted})