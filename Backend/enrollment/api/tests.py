from django.test import TestCase
from .models import (
    Address, Billing, Course, Enrollment, Grade, Instructor, PreRequisite, Schedule, Student
)
from .enums import STUDENT_GENDER, PAYMENT_STATUS, BILLING_CATEGORY, PROGRAM, ENROLLMENT_STATUS

class ModelsTestCase(TestCase):
    def setUp(self):
        # Create Address
        self.address = Address.objects.create(
            street="123 Main St",
            barangay="Downtown",
            city="Metro City",
            province="Metro Province"
        )
        
        # Create Student
        self.student = Student.objects.create(
            id=123456,
            first_name="John",
            last_name="Doe",
            gender=STUDENT_GENDER.MALE,
            address=self.address,
            status="ACTIVE",
            section=1,
            year_level=2,
            program=PROGRAM.IT
        )
        
        # Create Instructor
        self.instructor = Instructor.objects.create(
            first_name="Jane",
            last_name="Smith",
            gender=STUDENT_GENDER.FEMALE,
            address=self.address
        )
        
        # Create Course
        self.course = Course.objects.create(
            code="CS101",
            title="Introduction to Computer Science",
            year_level=1,
            semester=1,
            program=PROGRAM.IT
        )
        
        # Create Billing
        self.billing = Billing.objects.create(
            name="Tuition Fee",
            price=15000.00,
            category=BILLING_CATEGORY.TUITION,
            year_level=2,
            semester=1,
            student=self.student,
            billing_date="2024-01-01",
            status=PAYMENT_STATUS.PENDING
        )
        
        # Create Enrollment
        self.enrollment = Enrollment.objects.create(
            course=self.course,
            student=self.student,
            enrollment_date="2024-01-15",
            status=ENROLLMENT_STATUS.ENROLLED,
            school_year="2024-2025"
        )
        
        # Create Schedule
        self.schedule = Schedule.objects.create(
            course=self.course,
            instructor=self.instructor,
            from_time="08:00:00",
            to_time="10:00:00",
            year_level=1,
            section=1,
            category="LEC",
            day="Monday",
            room="Room 101"
        )

    def test_student_creation(self):
        """Test creating a student instance."""
        student = Student.objects.get(id=self.student.id)
        self.assertEqual(student.first_name, "John")
        self.assertEqual(student.program, PROGRAM.IT)

    def test_address_creation(self):
        """Test creating an address instance."""
        address = Address.objects.get(id=self.address.id)
        self.assertEqual(address.city, "Metro City")
        self.assertEqual(address.province, "Metro Province")

    def test_course_unique_constraint(self):
        """Test unique constraint for Course code and program."""
        with self.assertRaises(Exception):
            Course.objects.create(
                code="CS101",
                title="Another Course",
                year_level=2,
                semester=2,
                program=PROGRAM.IT
            )

    def test_instructor_full_name(self):
        """Test the full_name method of the Instructor model."""
        full_name = self.instructor.full_name()
        self.assertEqual(full_name, "Jane Smith")

    def test_billing_creation(self):
        """Test creating a billing record."""
        billing = Billing.objects.get(id=self.billing.id)
        self.assertEqual(billing.name, "Tuition Fee")
        self.assertEqual(billing.status, PAYMENT_STATUS.PENDING)

    def test_enrollment_unique_constraint(self):
        """Test unique constraint for Enrollment."""
        with self.assertRaises(Exception):
            Enrollment.objects.create(
                course=self.course,
                student=self.student,
                enrollment_date="2024-01-16",
                status=ENROLLMENT_STATUS.ENROLLED,
                school_year="2024-2025"
            )

    def test_schedule_creation(self):
        """Test creating a schedule record."""
        schedule = Schedule.objects.get(id=self.schedule.id)
        self.assertEqual(schedule.from_time.strftime("%H:%M:%S"), "08:00:00")
        self.assertEqual(schedule.room, "Room 101")

