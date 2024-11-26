from django import forms
from .models import (
    Address, Course, Enrollment, Grade, Instructor,
    Permission, Program, Role, RolePermission, Schedule,
    Student, User
)

class AddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = '__all__'


class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = '__all__'


class EnrollmentForm(forms.ModelForm):
    class Meta:
        model = Enrollment
        fields = '__all__'


class GradeForm(forms.ModelForm):
    class Meta:
        model = Grade
        fields = '__all__'


class InstructorForm(forms.ModelForm):
    class Meta:
        model = Instructor
        fields = '__all__'


class PermissionForm(forms.ModelForm):
    class Meta:
        model = Permission
        fields = '__all__'


class ProgramForm(forms.ModelForm):
    class Meta:
        model = Program
        fields = '__all__'


class RoleForm(forms.ModelForm):
    class Meta:
        model = Role
        fields = '__all__'


class RolePermissionForm(forms.ModelForm):
    class Meta:
        model = RolePermission
        fields = '__all__'


class ScheduleForm(forms.ModelForm):
    class Meta:
        model = Schedule
        fields = '__all__'


class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'
        widgets = {
            'password': forms.PasswordInput(render_value=True),
        }
