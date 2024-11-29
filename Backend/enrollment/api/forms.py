from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
from .models import (
    Address, Course, Enrollment, Grade, Instructor,
    PreRequisite, Billing, Schedule,
    Student
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


class PreRequisiteForm(ModelForm):
    class Meta:
        model = PreRequisite
        fields = '__all__'


class BillingForm(ModelForm):
    class Meta:
        model = Billing
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
