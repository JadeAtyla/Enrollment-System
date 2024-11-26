from django.db import models
from .enums import *

class Address(models.Model):
    id = models.IntegerField(primary_key=True)
    street = models.CharField(max_length=55, blank=True, null=True)
    barangay = models.CharField(max_length=55, blank=True, null=True)
    city = models.CharField(max_length=55, blank=True, null=True)
    province = models.CharField(max_length=55, blank=True, null=True)

    class Meta:
        db_table = 'address'


class Course(models.Model):
    id = models.CharField(primary_key=True, max_length=55)
    code = models.CharField(max_length=55)
    program = models.ForeignKey('Program', on_delete=models.CASCADE)
    title = models.CharField(max_length=55, blank=True, null=True)
    lab_units = models.IntegerField(blank=True, null=True)
    lec_units = models.IntegerField(blank=True, null=True)
    total_units = models.IntegerField(blank=True, null=True)
    year_level = models.IntegerField(blank=True, null=True)
    semester = models.IntegerField(blank=True, null=True)
    school_year = models.CharField(max_length=55, blank=True, null=True)
    pre_requisite = models.CharField(max_length=55, blank=True, null=True)

    class Meta:
        db_table = 'course'
        unique_together = (('code', 'program'),)


class Enrollment(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=ENROLLMENT_STATUS.choices)
    school_year = models.DateField()
    checked_by = models.ForeignKey('User', on_delete=models.CASCADE, db_column='checked_by', blank=True, null=True, db_comment='Role must be Department')
    released_by = models.ForeignKey('User', on_delete=models.CASCADE, db_column='released_by', related_name='enrollment_released_by_set', blank=True, null=True, db_comment='Role must be Registrar')

    class Meta:
        db_table = 'enrollment'
        unique_together = (('course', 'student'),)


class Grade(models.Model):
    id = models.IntegerField(primary_key=True)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, db_comment='1.00 to 5.00 scale')
    instructor = models.ForeignKey('Instructor', on_delete=models.CASCADE)
    remarks = models.CharField(max_length=21, blank=True, null=True, choices=GRADE_REMARKS.choices)

    class Meta:
        db_table = 'grade'
        unique_together = (('student', 'course'),)


class Instructor(models.Model):
    id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    suffix = models.CharField(max_length=55, blank=True, null=True)
    email = models.CharField(max_length=55, blank=True, null=True)
    contact_number = models.CharField(max_length=55, blank=True, null=True)
    password = models.CharField(max_length=55, blank=True, null=True)

    class Meta:
        db_table = 'instructor'


class Permission(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=55, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'permission'


class Program(models.Model):
    id = models.CharField(primary_key=True, max_length=55)
    abbreviation = models.CharField(max_length=55, blank=True, null=True)
    description = models.TextField()

    class Meta:
        db_table = 'program'


class Role(models.Model):
    id = models.IntegerField(primary_key=True)
    role = models.CharField(max_length=10, blank=True, null=True, choices=USER_ROLES.choices)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'role'


class RolePermission(models.Model):
    permission = models.OneToOneField(Permission, on_delete=models.CASCADE, primary_key=True)  # The composite primary key (permission_id, role_id) found, that is not supported. The first column is selected.
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    class Meta:
        db_table = 'role_permission'
        unique_together = (('permission', 'role'),)


class Schedule(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    from_time = models.TimeField(blank=True, null=True)
    to_time = models.TimeField(blank=True, null=True)
    category = models.CharField(max_length=3, blank=True, null=True, choices=LAB_OR_LEC.choices)
    day = models.CharField(max_length=55, blank=True, null=True, choices=SCHEDULE_DAY.choices)
    room = models.CharField(max_length=55, blank=True, null=True)

    class Meta:
        db_table = 'schedule'
        unique_together = (('day', 'from_time', 'to_time'),)


class Student(models.Model):
    id = models.BigIntegerField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    suffix = models.CharField(max_length=55, blank=True, null=True)
    year_level = models.IntegerField(blank=True, null=True)
    section = models.IntegerField(blank=True, null=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)
    old_or_new = models.CharField(max_length=3, blank=True, null=True, choices=OLD_OR_NEW_STUDENT.choices)
    status = models.CharField(max_length=55, choices=STUDENT_REG_STATUS.choices)
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=17, blank=True, null=True, choices=GENDER.choices)
    contact_number = models.CharField(max_length=55, blank=True, null=True)
    email = models.CharField(max_length=55, blank=True, null=True)

    class Meta:
        db_table = 'student'


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=55, blank=True, null=True)
    last_name = models.CharField(max_length=55, blank=True, null=True)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    suffix = models.CharField(max_length=55, blank=True, null=True)
    email = models.CharField(max_length=55, blank=True, null=True)
    contact_number = models.CharField(max_length=55, blank=True, null=True)
    username = models.CharField(unique=True, max_length=55, db_comment='Student will use their student number for username. Registrar, Admin and Department has different format for username')
    password = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    class Meta:
        db_table = 'user'