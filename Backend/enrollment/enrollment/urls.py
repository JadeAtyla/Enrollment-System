"""
URL configuration for enrollment project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app import views # from app folder import views.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.RoleAPIView.as_view(), name='role-list'), # from views.py render function/def data
    
    path('register/', views.register, name='register'),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='login'),  # Token obtain and refresh endpoints
    path('refresh/', views.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.logout, name='logout'),
    path('data/', views.data, name='data'),
    path('courses/<str:program_id>/', views.list_courses_by_program, name='list_courses_by_program'),
    path('enroll/<int:student_id>/<str:course_code>/', views.enroll_student, name='enroll_student'),
    path('student_form', views.student_form, name= "Student-Form"),
]