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

    # Sample Fethcing of Data
    path('address/', views.AddressListView.as_view(), name='address-list'),
    path('course/', views.CourseListView.as_view(), name='course-list'),
    path('enrollment/', views.EnrollmentListView.as_view(), name='enrollment-list'),
    path('grade/', views.GradeListView.as_view(), name='grade-list'),
    path('instructor/', views.InstructorListView.as_view(), name='instructor-list'),
    path('schedule/', views.ScheduleListView.as_view(), name='schedule-list'),
    path('student/', views.StudentListView.as_view(), name='student-list'),
    path('billing/', views.BillingListView.as_view(), name='billing-list'),
    path('pre-requisite/', views.PreRequisiteListView.as_view(), name='pre-requisite-list'),
    path('user/', views.UserListView.as_view(), name='user-list'),

    #Student Log in
    path('api/login/', views.login_user, name='login_user'),
    path("api/student-data/", views.get_student_data, name="get_student_data"), #Student Dashboard
    path("api/get-student-profile/", views.get_student_profile, name="get_student_profile"),
    path("api/change-password/", views.change_password, name="change_password"),
    path("api/profile/", views.get_user_profile, name="get_user_profile"),


]