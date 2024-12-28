from django.db import models
from .enums import *
from django.core.validators import RegexValidator


class Address(models.Model):
    street = models.CharField(max_length=100, blank=True, null=True)
    barangay = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100)
    province = models.CharField(max_length=100)

    class Meta:
        db_table = 'address'


class Program(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    description = models.CharField(max_length=255)

    class Meta:
        db_table = 'program'


class Sectioning(models.Model):
    limit_per_section = models.PositiveIntegerField()
    year_level = models.PositiveIntegerField()
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name="sections")

    class Meta:
        db_table = 'sectioning'
        constraints = [
            models.UniqueConstraint(fields=['year_level', 'program'], name='unique_limit_per_year_program')
        ]


class Student(models.Model):
    id = models.BigIntegerField(
        primary_key=True,
        unique=True,
    )
    email = models.CharField(
        max_length=55,
        unique=True,
        blank=True,
        null=True,
    )
    first_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    last_name = models.CharField(max_length=55)
    suffix = models.CharField(max_length=10, blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="address")
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=50, choices=STUDENT_GENDER.choices)
    contact_number = models.CharField(
        max_length=13,
        blank=True,
        null=True,
    )
    status = models.CharField(max_length=15, choices=STUDENT_REG_STATUS.choices, default=STUDENT_REG_STATUS.NOT_ENROLLED)
    section = models.IntegerField(blank=True, null=True)
    year_level = models.PositiveIntegerField()
    semester = models.PositiveIntegerField()
    academic_year = models.CharField(max_length=20, blank=True, null=True)
    category = models.CharField(max_length=3, choices=STUDENT_CATEGORY.choices, blank=True, null=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name="students", blank=True, null=True)
    enrollment_status = models.CharField(max_length=10, choices=ENROLLMENT_STATUS.choices)
    # # Trigger
    # def save(self, *args, **kwargs):
    #     self.category = STUDENT_CATEGORY.NEW if self.year_level <= 1 else STUDENT_CATEGORY.OLD
        
    #     # Initialize decrypted id
    #     decrypt_id = str(self.id)[4:6]
    #     program = None

    #     # Sets the program of the student according to the middle number
    #     if decrypt_id == '11':
    #         program = Program.objects.get(id='BSCS')  # Fetch the Program instance
    #     elif decrypt_id == '10':
    #         program = Program.objects.get(id='BSIT')  # Fetch the Program instance
    #     else:
    #         raise ValueError("Student number doesn't recognized")
        
    #     self.program = program
        

    #     super().save(*args, **kwargs)

    class Meta:
        db_table = 'student'


class Instructor(models.Model):
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, blank=True, null=True)
    suffix = models.CharField(max_length=10, blank=True, null=True)
    gender = models.CharField(max_length=50, choices=STUDENT_GENDER.choices)
    email = models.CharField(max_length=55, blank=True, null=True)
    contact_number = models.CharField(max_length=13, blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='instructors')

    class Meta:
        db_table = 'instructor'


class Course(models.Model):
    code = models.CharField(max_length=20)
    title = models.CharField(max_length=255)
    lab_units = models.PositiveIntegerField(blank=True, null=True)
    lec_units = models.PositiveIntegerField(blank=True, null=True)
    contact_hr_lab = models.PositiveIntegerField(blank=True, null=True)
    contact_hr_lec = models.PositiveIntegerField(blank=True, null=True)
    year_level = models.PositiveIntegerField()
    semester = models.PositiveIntegerField()
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name="courses")
    pre_requisites = models.ManyToManyField('self', blank=True, symmetrical=False, related_name="required_by")
    
    class Meta:
        db_table = 'course'
        constraints = [
            models.UniqueConstraint(fields=['code', 'program'], name='unique_course_program')
        ]

class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="enrollments")
    enrollment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=ENROLLMENT_STATUS.choices)
    year_level_taken = models.PositiveIntegerField(default=1)
    semester_taken = models.PositiveIntegerField(default=1)
    school_year = models.CharField(max_length=20)

    class Meta:
        db_table = 'enrollment'
        constraints = [
            models.UniqueConstraint(fields=['course', 'student'], name='unique_enrollment')
        ]

class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='grades')
    grade = models.CharField(max_length=4, db_comment='1.00 to 5.00 or S scale')
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name="grades_given")
    remarks = models.CharField(max_length=20, blank=True, null=True, choices=GRADE_REMARKS.choices)

    # def save(self, *args, **kwargs):
    #     # Determine the remarks based on the grade
    #     if self.grade:  # Ensure grade is not null or empty
    #         try:
    #             grade_value = float(self.grade)  # Attempt to convert the grade to a float
    #         except ValueError:
    #             grade_value = None  # If conversion fails (e.g., "INC" or "DRP")

    #         # Assign remarks based on the grade or specific cases
    #         if grade_value is not None:  # Grade is numeric
    #             if grade_value <= 3.0:  # Passed (1.0 to 3.0)
    #                 self.remarks = GRADE_REMARKS.PASSED
    #             elif grade_value == 4.0:  # Conditional failure (4.0)
    #                 self.remarks = GRADE_REMARKS.CONDITIONAL_FAILURE
    #             elif grade_value >= 5.0:  # Failed (5.0 and above)
    #                 self.remarks = GRADE_REMARKS.FAILED
    #         else:  # Grade is non-numeric
    #             if self.grade == 'S':  # Passed (Special grade "S")
    #                 self.remarks = GRADE_REMARKS.PASSED
    #             elif self.grade == 'INC':  # Incomplete
    #                 self.remarks = GRADE_REMARKS.INCOMPLETE
    #             elif self.grade == 'DRP':  # Dropped subject
    #                 self.remarks = GRADE_REMARKS.DROPPED_SUBJECT
    #             elif self.grade in ['0', None]:  # Not graded yet (0 or null)
    #                 self.remarks = GRADE_REMARKS.NOT_GRADED_YET
    #             else:
    #                 self.remarks = None  # Default case

    #     super().save(*args, **kwargs)  # Call the parent save method

    class Meta:
        db_table = 'grade'
        constraints = [
            models.UniqueConstraint(fields=['student', 'course'], name='unique_student_course_grade')
        ]


class BillingList(models.Model):
    name = models.CharField(max_length=55)
    category = models.CharField(max_length=20, choices=BILLING_CATEGORY.choices)

    class Meta:
        db_table = 'billing_list'

class AcadTermBilling(models.Model):
    billing = models.ForeignKey('BillingList', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    year_level = models.IntegerField()
    semester = models.IntegerField()

    class Meta:
        db_table = 'acad_term_billing'
        constraints = [
            models.UniqueConstraint(fields=['billing', 'year_level', 'semester'], name='unique_acad_billing')
        ]

class Receipt(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.DecimalField(max_digits=10, decimal_places=2)
    remaining = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    terms = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=55, choices=PAYMENT_STATUS.choices, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    school_year = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        self.terms = 1
        self.remaining = self.total - self.paid

        status = PAYMENT_STATUS.UNPAID
        
        # Update the status based on the remaining amount
        if self.remaining > 0 and self.remaining < self.total:  # If there is still remaining balance
            status = PAYMENT_STATUS.PENDING
        elif self.remaining == 0:  # If remaining balance is fully paid
            status = PAYMENT_STATUS.PAID
        elif self.remaining == self.total:  # If remaining is equal to the total (no payment made)
            status = PAYMENT_STATUS.UNPAID
        
        self.status = status

        super().save(*args, **kwargs)

    class Meta:
        db_table = 'receipt'
