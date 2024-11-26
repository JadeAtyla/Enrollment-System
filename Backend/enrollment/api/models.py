from django.db import models
from .enums import *


class Address(models.Model):
    street = models.CharField(max_length=55, blank=True, null=True)
    barangay = models.CharField(max_length=55, blank=True, null=True)
    city = models.CharField(max_length=55)
    province = models.CharField(max_length=55)

    class Meta:
        managed = False
        db_table = 'address'


class Billing(models.Model):
    id = models.IntegerField(primary_key=True)
    type = models.CharField(max_length=55)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=10)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'billing'


class Course(models.Model):
    code = models.CharField(max_length=55)
    title = models.CharField(max_length=55)
    lab_units = models.IntegerField(blank=True, null=True)
    lec_units = models.IntegerField(blank=True, null=True)
    year_level = models.IntegerField()
    semester = models.IntegerField()
    program = models.ForeignKey('Program', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course'
        unique_together = (('id', 'code'),)


class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=ENROLLMENT_STATUS.choices)
    school_year = models.DateField()
    released_by = models.ForeignKey('User', on_delete=models.CASCADE, db_column='released_by', db_comment='Role must be Registrar')

    class Meta:
        managed = False
        db_table = 'enrollment'
        unique_together = (('course', 'student'),)


class Grade(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, db_comment='1.00 to 5.00 scale')
    instructor = models.ForeignKey('Instructor', on_delete=models.CASCADE)
    remarks = models.CharField(max_length=21, choices=GRADE_REMARKS.choices, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'grade'
        unique_together = (('student', 'course'),)


class Instructor(models.Model):
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    suffix = models.CharField(max_length=55, blank=True, null=True)
    email = models.CharField(max_length=55, blank=True, null=True)
    contact_number = models.CharField(max_length=55, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'instructor'


class Permission(models.Model):
    permission = models.CharField(max_length=55)
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'permission'


class PreRequisite(models.Model):
    pre_requisite = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='pre_requisite')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='prerequisite_course_set')

    class Meta:
        managed = False
        db_table = 'pre_requisite'


class Program(models.Model):
    abbreviation = models.CharField(max_length=55)
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'program'


class Role(models.Model):
    role = models.CharField(max_length=10, choices=USER_ROLES.choices, db_comment='Registrar, Admin, Department and Student')
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'role'


class RolePermission(models.Model):
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'role_permission'
        unique_together = (('permission', 'role'),)


class Schedule(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    from_time = models.TimeField(blank=True, null=True)
    to_time = models.TimeField(blank=True, null=True)
    category = models.CharField(max_length=3, choices=LAB_OR_LEC.choices, blank=True, null=True)
    day = models.CharField(max_length=9, choices=SCHEDULE_DAY.choices, blank=True, null=True)
    room = models.CharField(max_length=55, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'schedule'
        unique_together = (('course', 'instructor', 'category', 'day', 'from_time', 'to_time'),)


class Student(models.Model):
    id = models.BigIntegerField(primary_key=True)
    email = models.CharField(unique=True, max_length=55, blank=True, null=True)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    suffix = models.CharField(max_length=55, blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=17, choices=GENDER.choices)
    contact_number = models.CharField(max_length=55, blank=True, null=True)
    status = models.CharField(max_length=11, choices=STUDENT_REG_STATUS.choices)
    section = models.IntegerField()
    year_level = models.IntegerField()
    academic_year = models.CharField(max_length=55, blank=True, null=True)
    category = models.CharField(max_length=3, choices=OLD_OR_NEW_STUDENT.choices)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'student'


class User(models.Model):
    first_name = models.CharField(max_length=55, blank=True, null=True)
    last_name = models.CharField(max_length=55, blank=True, null=True)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    suffix = models.CharField(max_length=55, blank=True, null=True)
    email = models.CharField(max_length=55, blank=True, null=True)
    contact_number = models.CharField(max_length=55, blank=True, null=True)
    username = models.CharField(unique=True, max_length=55, db_comment='Student will use their student number for username. Registrar, Admin and Department has different format for username')
    password = models.CharField(max_length=55)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'user'