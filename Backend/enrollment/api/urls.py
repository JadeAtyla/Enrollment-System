from django.urls import path
from .views import *

urlpatterns = [
    # Authentication endpoints
    path('register/', RegisterView.as_view(), name='register'),  # Register endpoint
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),  # Login endpoint
    path('login/registrar/', RegistrarUserView.as_view(), name='registrar-login'),  # Login endpoint
    path('login/student/', StudentUserView.as_view(), name='student-login'),  # Login endpoint
    path('login/department/', DepartmentUserView.as_view(), name='department-login'),  # Login endpoint
    path('refresh/', CustomTokenRefreshView.as_view(), name='refresh_token'),  # Refresh token
    path('logout/', LogoutView.as_view(), name='logout'),  # Logout endpoint

    # Protection endpoints
    path('protect/student/', ProtectStudentView.as_view(), name='protect_student'),
    path('protect/registrar/', ProtectRegistrarView.as_view(), name='protect_registrar'),
    path('protect/department/', ProtectDepartmentView.as_view(), name='protect_department'),  
    
    # Example CRUD endpoints for resources
    path('address/', AddressView.as_view(), name='address'),
    path('course/', CourseView.as_view(), name='course'),
    path('enrollment/', EnrollmentView.as_view(), name='enrollment'),
    path('grade/', GradeView.as_view(), name='grade'),
    path('instructor/', InstructorView.as_view(), name='instructor'),
    path('student/', StudentView.as_view(), name='student'),
    path('user/', UserView.as_view(), name='user'),
    path('sectioning/', SectioningView.as_view(), name='sectioning'),
    path('acadtermbilling/', AcadTermBillingView.as_view(), name='acad term billing'),

    # Enrollment endpoints
    path('batch/', BatchEnrollStudentAPIView.as_view(), name='batch'),

    # Student Forms
    path('cor/', CORView.as_view(), name='cor'),
    path('checklist/', ChecklistView.as_view(), name='checklist'),

    # Officers Accessible Data's
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
