from django.db import models
from .enums import *

class Address(models.Model):
    street = models.CharField(max_length=55, blank=True, null=True)
    barangay = models.CharField(max_length=55, blank=True, null=True)
    city = models.CharField(max_length=55)
    province = models.CharField(max_length=55)

    class Meta:
        
        db_table = 'address'


class Billing(models.Model):
    name = models.CharField(max_length=55)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=55, choices=BILLING_CATEGORY.choices)
    year_level = models.IntegerField()
    semester = models.IntegerField()
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    billing_date = models.DateField()
    status = models.CharField(max_length=15, choices=PAYMENT_STATUS.choices)

    class Meta:
        
        db_table = 'billing'


class Course(models.Model):
    code = models.CharField(max_length=55)
    title = models.CharField(max_length=255)
    lab_units = models.IntegerField(blank=True, null=True)
    lec_units = models.IntegerField(blank=True, null=True)
    contact_hr_lab = models.IntegerField(blank=True, null=True)
    contact_hr_lec = models.IntegerField(blank=True, null=True)
    year_level = models.IntegerField()
    semester = models.IntegerField()
    program = models.CharField(max_length=14, choices=PROGRAM.choices)

    class Meta:
        db_table = 'course'
        unique_together = (('code', 'program'),)


class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=ENROLLMENT_STATUS.choices)
    school_year = models.CharField(max_length=55)

    class Meta:
        
        db_table = 'enrollment'
        unique_together = (('course', 'student'),)


class Grade(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.CharField(max_length=4, blank=True, null=True, db_comment='1.00 to 5.00 or S scale')
    instructor = models.ForeignKey('Instructor', on_delete=models.CASCADE)
    remarks = models.CharField(max_length=21, blank=True, null=True, choices=GRADE_REMARKS.choices)

    class Meta:
        
        db_table = 'grade'
        unique_together = (('student', 'course'),)


class Instructor(models.Model):
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    suffix = models.CharField(max_length=55, blank=True, null=True)
    gender = models.CharField(max_length=17, choices=STUDENT_GENDER.choices)
    email = models.CharField(max_length=55, blank=True, null=True)
    contact_number = models.CharField(max_length=55, blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

    class Meta:
        
        db_table = 'instructor'


class PreRequisite(models.Model):
    pre_requisite = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='pre_requisite')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='prerequisite_course_set')
    program = models.CharField(max_length=14, choices=PROGRAM.choices)
    class Meta:
        
        db_table = 'pre_requisite'


class Schedule(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    from_time = models.TimeField(blank=True, null=True)
    to_time = models.TimeField(blank=True, null=True)
    year_level = models.IntegerField()
    section = models.IntegerField()
    category = models.CharField(max_length=3, choices=LAB_OR_LEC.choices, blank=True, null=True)
    day = models.CharField(max_length=9, choices=SCHEDULE_DAY.choices, blank=True, null=True)
    room = models.CharField(max_length=55, blank=True, null=True)

    class Meta:
     
        db_table = 'schedule'
        unique_together = (('course', 'category', 'day', 'section', 'year_level', 'from_time', 'to_time'),)


class Student(models.Model):
    id = models.BigIntegerField(primary_key=True)
    email = models.CharField(unique=True, max_length=55, blank=True, null=True)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    suffix = models.CharField(max_length=55, blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=17, choices=STUDENT_GENDER.choices)
    contact_number = models.CharField(max_length=55, blank=True, null=True)
    status = models.CharField(max_length=11, choices=STUDENT_REG_STATUS.choices)
    section = models.IntegerField()
    year_level = models.IntegerField()
    academic_year = models.CharField(max_length=55, blank=True, null=True)
    category = models.CharField(max_length=3, choices=OLD_OR_NEW_STUDENT.choices)
    program = models.CharField(max_length=14, choices=PROGRAM.choices)

    class Meta:
     
        db_table = 'student'