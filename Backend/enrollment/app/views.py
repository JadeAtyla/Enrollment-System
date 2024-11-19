from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import UserRegisterSerializer, UserSerializer, CourseSerializer, EnrollmentSerializer
from .models import Address, Course, Enrollment, Grade, Instructor, Permission, Program, Role, RolePermission, Schedule, Student, User
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

# Retrieve data in JSON format
def data(request):
    enrollment = Enrollment.objects.all().values()  # Retrieve all data as a dictionary
    return JsonResponse(list(enrollment), safe=False)  # Convert to JSON and return


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
    program = get_object_or_404(Program, pk=program_id) 
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
