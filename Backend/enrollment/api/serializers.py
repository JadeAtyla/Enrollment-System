from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *
from .utils.validators import ValidateGroup, RegistrationValidator, PasswordValidator
from .utils.services import StudentService, GradeService
from django.db.models import Sum
from django.db import IntegrityError
from api.utils.validators import EmailValidator, ContactNumberValidator, StudentNumberValidator

# Receipt Serializer
class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'

# Billing List Serializer
class BillingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingList
        fields = '__all__'

# Acad Term Billing Serializer
class AcadTermBillingSerializer(serializers.ModelSerializer):
    billing = BillingListSerializer()

    class Meta:
        model = AcadTermBilling
        fields = '__all__'

# Address Serializer
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['city', 'province']


# Program Serializer
class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'
    
    def create(self, validated_data):
        program_id = validated_data['id']
        validated_data['id'] = program_id.upper()
        return Program.objects.create(**validated_data)


class CourseSerializer(serializers.ModelSerializer):
    program = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all())  # Only the program ID is required
    pre_requisites = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)  # Only IDs for pre_requisites

    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        # Create the course with the validated data
        pre_requisite_data = validated_data.pop('pre_requisites', [])
        course = Course.objects.create(**validated_data)

        # Use set() to assign pre_requisites (many-to-many relationship)
        course.pre_requisites.set(pre_requisite_data)

        return course

    def to_representation(self, instance):
        # Customize the output representation
        representation = super().to_representation(instance)
        # Instead of nested program data, just return the program ID
        representation['program'] = instance.program.id
        # Return only the IDs of the pre_requisites
        representation['pre_requisites'] = [course.id for course in instance.pre_requisites.all()]
        return representation


# Enrollment Serializer
class EnrollmentSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())

    class Meta:
        model = Enrollment
        fields = '__all__'

    def create(self, validated_data):
        course_data = validated_data.pop('course')
        course = Course.objects.get(id=course_data.id)
        validated_data['course'] = course
        return Enrollment.objects.create(**validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['course'] = CourseSerializer(instance.course).data
        # representation['student'] = StudentSerializer(instance.student).data
        return representation


# Grade Serializer
class GradeSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    instructor = serializers.PrimaryKeyRelatedField(queryset=Instructor.objects.all())

    class Meta:
        model = Grade
        fields = '__all__'

    def create(self, validated_data):
        grade_value = validated_data.get('grade')
        validated_data['remarks'] = GradeService.set_remarks(grade_value)

        return Grade.objects.create(**validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['course'] = CourseSerializer(instance.course).data
        representation['instructor'] = InstructorSerializer(instance.instructor).data
        # representation['student'] = StudentSerializer(instance.student).data
        return representation


# Instructor Serializer
class InstructorSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Instructor
        fields = '__all__'

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address, _ = Address.objects.get_or_create(**address_data)
        validated_data['address'] = address
        email = validated_data['email']
        contact_number = validated_data['contact_number']

        # Validation of email and contact number
        EmailValidator.validate_email(email)
        ContactNumberValidator.validate_contact_number(contact_number)

        return Instructor.objects.create(**validated_data)


# Student Serializer
class StudentSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address, _ = Address.objects.get_or_create(**address_data)

        student_id = validated_data['id']
        year_level = validated_data['year_level']
        email = validated_data['email']
        contact_number = validated_data['contact_number']

        # Validation
        StudentNumberValidator(student_id)
        EmailValidator.validate_email(email)
        ContactNumberValidator.validate_contact_number(contact_number)

        validated_data['address'] = address
        validated_data['category'] = StudentService.set_category(year_level)
        validated_data['program'] = StudentService.set_program(student_id)

        return Student.objects.create(**validated_data)


# Sectioning Serializer
class SectioningSerializer(serializers.ModelSerializer):
    program = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all())

    class Meta:
        model = Sectioning
        fields = '__all__'

    def create(self, validated_data):
        program_data = validated_data.pop('program')
        program = Program.objects.get(id=program_data.id)
        validated_data['program'] = program
        return Sectioning.objects.create(**validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['program'] = ProgramSerializer(instance.program).data
        return representation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class UserRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    group = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True, min_length=8)
    re_password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'group', 'password', 're_password']

    def validate(self, data):
        """
        Custom validation for group and username.
        """
        username = data.get("username")
        group_name = data.get("group")
        password = data.get("password")
        re_password = data.get("re_password")

        # Check if required fields are provided
        if not username or not group_name or not password or not re_password:
            raise serializers.ValidationError("Username, group, and passwords are required.")
        # Validate group name
        ValidateGroup.is_valid(group_name)

        # If the user is a student, check if the student exists in the Student table
        RegistrationValidator.is_authorized_to_register(['student'], username, Student, self)
        
        # Ensure passwords match
        PasswordValidator.validate_passwords(password, re_password)

        return data

    def create(self, validated_data):
        """
        Create a new user and assign them to the appropriate group.
        """
        username = validated_data.get("username")
        group_name = validated_data.get("group")
        password = validated_data.get("password")

        email = '-'
        student_exists = False

        try:
            student_instance = Student.objects.filter(id=username)
            student_exists = student_instance.exists()
            email = student_instance.first().email
        except ValueError:
            student_exists = False

        # If the user is a student, assign the 'student' group automatically
        if student_exists:
            group_name = "student"

        # Assign the group
        if group_name == "student":
            group = Group.objects.get(name="student")
        else:
            try:
                group = Group.objects.get(name=group_name)
            except Group.DoesNotExist:
                raise serializers.ValidationError(f"The group '{group_name}' does not exist.")
        
        # Create the user
        user = User.objects.create_user(username=username, password=password, email=email)

        user.groups.add(group)
        user.save()

        return user