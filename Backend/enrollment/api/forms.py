from django import forms
from django.forms import ModelForm
from .models import (
    Address, Course, Enrollment, Grade, Instructor,
    Permission, Program, Role, RolePermission, Schedule,
    Student, User
)

class AddressForm(ModelForm):
    class Meta:
        model = Address
        fields = '__all__'


class CourseForm(ModelForm):
    class Meta:
        model = Course
        fields = '__all__'


class EnrollmentForm(ModelForm):
    class Meta:
        model = Enrollment
        fields = '__all__'


class GradeForm(forms.ModelForm):
    class Meta:
        model = Grade
        fields = '__all__'


class InstructorForm(ModelForm):
    class Meta:
        model = Instructor
        fields = '__all__'


class PermissionForm(ModelForm):
    class Meta:
        model = Permission
        fields = '__all__'


class ProgramForm(ModelForm):
    class Meta:
        model = Program
        fields = '__all__'


class RoleForm(ModelForm):
    class Meta:
        model = Role
        fields = '__all__'


class RolePermissionForm(ModelForm):
    class Meta:
        model = RolePermission
        fields = '__all__'


class ScheduleForm(ModelForm):
    class Meta:
        model = Schedule
        fields = '__all__'


class StudentForm(ModelForm):
    class Meta:
        model = Student
        fields = '__all__'


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = '__all__'
        widgets = {
            'password': forms.PasswordInput(render_value=True),
        }
