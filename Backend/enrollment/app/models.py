from django.db import models
from .enums import *

class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, null=True, blank=True)
    suffix = models.CharField(max_length=55, null=True, blank=True)
    email = models.EmailField(max_length=55)
    contact_number = models.CharField(max_length=55)
    username = models.CharField(max_length=55, unique=True)
    password = models.CharField(max_length=55)
    role = models.CharField(
        max_length=55, choices=USER_ROLES.choices, default=USER_ROLES.STUDENT
    )

class Program(models.Model):
    id = models.CharField(primary_key=True, max_length=55)
    abbreviation = models.CharField(max_length=55)
    description = models.TextField()

class Address(models.Model):
    id = models.AutoField(primary_key=True)
    street = models.CharField(max_length=55)
    barangay = models.CharField(max_length=55)
    city = models.CharField(max_length=55)
    province = models.CharField(max_length=55)

class Student(models.Model):
    id = models.BigIntegerField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, null=True, blank=True)
    suffix = models.CharField(max_length=55, null=True, blank=True)
    year_level = models.IntegerField(null=True, blank=True)
    section = models.IntegerField(null=True, blank=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True, blank=True)
    old_or_new = models.CharField(
        max_length=55, choices=OLD_OR_NEW_STUDENT.choices, default=OLD_OR_NEW_STUDENT.OLD
    )
    status = models.CharField(
        max_length=55, choices=STUDENT_REG_STATUS.choices, default=STUDENT_REG_STATUS.REGULAR
    )
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER.choices, null=True, blank=True)
    contact_number = models.CharField(max_length=55)
    email = models.EmailField(max_length=55)

class Schedule(models.Model):
    id = models.AutoField(primary_key=True)
    course_id = models.ForeignKey('Course', on_delete=models.CASCADE)
    instructor = models.ForeignKey('Instructor', on_delete=models.CASCADE)
    from_time = models.TimeField()
    to_time = models.TimeField()
    category = models.CharField(max_length=3, choices=LAB_OR_LEC.choices)
    day = models.CharField(max_length=10, choices=SCHEDULE_DAY.choices)
    room = models.CharField(max_length=55)

class Instructor(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, null=True, blank=True)
    suffix = models.CharField(max_length=55, null=True, blank=True)
    email = models.EmailField(max_length=55)
    contact_number = models.CharField(max_length=55)
    password = models.CharField(max_length=55)

class Course(models.Model):
    id = models.CharField(primary_key=True, max_length=55)
    code = models.CharField(max_length=55)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    title = models.CharField(max_length=55)
    lab_units = models.IntegerField(null=True, blank=True)
    lec_units = models.IntegerField(null=True, blank=True)
    total_units = models.IntegerField()
    year_level = models.IntegerField()
    semester = models.IntegerField()
    school_year = models.CharField(max_length=55)
    pre_requisite = models.CharField(max_length=55, null=True, blank=True)

class Enrollment(models.Model):
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=55, choices=ENROLLMENT_STATUS.choices, default=ENROLLMENT_STATUS.ENROLLED
    )
    school_year = models.DateField()
    checked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='checked_by')
    released_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='released_by')

class Grade(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.DecimalField(max_digits=5, decimal_places=2)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    remarks = models.CharField(
        max_length=55, choices=GRADE_REMARKS.choices, default=GRADE_REMARKS.NOT_GRADED_YET
    )

class Permission(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=55)
    description = models.TextField()

class Role(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=10, choices=USER_ROLES.choices)
    description = models.TextField()

class RolePermission(models.Model):
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

