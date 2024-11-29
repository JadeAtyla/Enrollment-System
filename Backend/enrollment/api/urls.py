from django.urls import path
from api import views # from app folder import views.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='login'),  # Token obtain and refresh endpoints
    path('refresh/', views.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.logout, name='logout'),
    # path('data/', views.data, name='data'),
    path('courses/<str:program_id>/', views.list_courses_by_program, name='list_courses_by_program'),
    path('enroll/<int:student_id>/<str:course_code>/', views.enroll_student, name='enroll_student'),
]