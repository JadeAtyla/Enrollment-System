from django.db import models
from .enums import *

class Role(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=15, choices=USER_ROLES.choices)
    description = models.TextField()

class Permission(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=55)
    description = models.TextField()

class RolePermission(models.Model):
    permission_id = models.ForeignKey(Permission, on_delete=models.CASCADE)
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('permission_id', 'role_id')

class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, null=True, blank=True)
    suffix = models.CharField(max_length=55, null=True, blank=True)
    email = models.EmailField(max_length=55)
    contact_number = models.CharField(max_length=55)
    username = models.CharField(max_length=55, unique=True)
    password = models.CharField(max_length=255)  # Use a hashed password
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE)

class Program(models.Model):
    id = models.CharField(max_length=55, primary_key=True)
    abbreviation = models.CharField(max_length=55)
    description = models.TextField()

class Address(models.Model):
    id = models.AutoField(primary_key=True)
    street = models.CharField(max_length=55)
    barangay = models.CharField(max_length=55)
    city = models.CharField(max_length=55)
    province = models.CharField(max_length=55)

class Student(models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, null=True, blank=True)
    suffix = models.CharField(max_length=55, null=True, blank=True)
    year_level = models.PositiveIntegerField()
    section = models.PositiveIntegerField()
    program_id = models.ForeignKey(Program, on_delete=models.CASCADE)
    address_id = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True)
    old_or_new = models.CharField(max_length=55, choices=OLD_OR_NEW_STUDENT.choices, default=OLD_OR_NEW_STUDENT.OLD)
    status = models.CharField(max_length=55, choices=STUDENT_REG_STATUS.choices, default=STUDENT_REG_STATUS.REGULAR)
    birth_date = models.DateField()
    gender = models.CharField(max_length=55, choices=GENDER.choices, null=True, blank=True)
    contact_number = models.CharField(max_length=55)
    email = models.EmailField(max_length=55)

class Course(models.Model):
    id = models.CharField(max_length=55, primary_key=True)
    code = models.CharField(max_length=55)
    program_id = models.ForeignKey(Program, on_delete=models.CASCADE)
    title = models.CharField(max_length=55)
    lab_units = models.PositiveIntegerField()
    lec_units = models.PositiveIntegerField()
    total_units = models.PositiveIntegerField()
    year_level = models.PositiveIntegerField()
    semester = models.PositiveIntegerField()
    school_year = models.CharField(max_length=55)
    pre_requisite = models.CharField(max_length=55, null=True, blank=True)

    class Meta:
        unique_together = ('code', 'program_id')

class Schedule(models.Model):
    id = models.AutoField(primary_key=True)
    course_code = models.ForeignKey(Course, on_delete=models.CASCADE)
    instructor_id = models.ForeignKey('Instructor', on_delete=models.CASCADE)
    from_time = models.TimeField()
    to_time = models.TimeField()
    category = models.CharField(max_length=55, choices=LAB_OR_LEC.choices)
    day = models.CharField(max_length=55, choices=SCHEDULE_DAY.choices)
    room = models.CharField(max_length=55)

    class Meta:
        unique_together = ('day', 'from_time', 'to_time')

class Instructor(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, null=True, blank=True)
    suffix = models.CharField(max_length=55, null=True, blank=True)
    email = models.EmailField(max_length=55)
    contact_number = models.CharField(max_length=55)

class Enrollment(models.Model):
    id = models.AutoField(primary_key=True)
    course_code = models.ForeignKey(Course, on_delete=models.CASCADE)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=ENROLLMENT_STATUS.choices)
    school_year = models.DateField()
    checked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='checked_enrollments')
    released_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='released_enrollments')

    class Meta:
        unique_together = ('course_code', 'student_id')

class Grade(models.Model):
    id = models.AutoField(primary_key=True)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    course_code = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    instructor_id = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    remarks = models.CharField(max_length=30, choices=GRADE_REMARKS.choices, default=GRADE_REMARKS.NOT_GRADED_YET)

    class Meta:
        unique_together = ('student_id', 'course_code')
