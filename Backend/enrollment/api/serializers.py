from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

# Fixed BillingSerializer
class BillingSerializer(serializers.ModelSerializer):  # Model should be Billing
    class Meta:
        model = Billing
        fields = '__all__'

# Fixed PreRequisiteSerializer
class PreRequisiteSerializer(serializers.ModelSerializer):  # Model should be PreRequisite
    class Meta:
        model = PreRequisite
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class UserRegisterSerializer(serializers.ModelSerializer):
    token = serializers.CharField(allow_blank=True, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'token']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        

        # Perform validation (check username and password)
        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            # Generate JWT token if valid
            refresh = RefreshToken.for_user(user)
            attrs['token'] = str(refresh.access_token)
            return attrs
        else:
            raise serializers.ValidationError('Invalid credentials')
