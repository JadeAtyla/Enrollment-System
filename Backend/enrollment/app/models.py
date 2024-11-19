from django.db import models

# Create your models here.
class Address(models.Model):
    id = models.IntegerField(primary_key=True)
    street = models.CharField(max_length=55, null=True)
    barangay = models.CharField(max_length=55, null=True)
    city = models.CharField(max_length=55, null=True)
    province = models.CharField(max_length=55, null=True)

    class Meta:
        managed = False
        db_table = 'address'


class Course(models.Model):
    code = models.CharField(primary_key=True, max_length=55)  # The composite primary key (code, program_id) found, that is not supported. The first column is selected.
    program = models.ForeignKey('Program', models.DO_NOTHING, unique=True)
    title = models.CharField(max_length=55, null=True)
    lab_units = models.IntegerField(null=True)
    lec_units = models.IntegerField(null=True)
    total_units = models.IntegerField(null=True)
    year_level = models.IntegerField(null=True)
    semester = models.IntegerField(null=True)
    school_year = models.CharField(max_length=55, null=True)
    pre_requisite = models.CharField(max_length=55, null=True)

    class Meta:
        managed = False
        db_table = 'course'
        unique_together = (('code', 'program'),)


class Enrollment(models.Model):
    id = models.IntegerField(primary_key=True)
    course_code = models.ForeignKey('Course', models.DO_NOTHING, db_column='course_code')
    program = models.ForeignKey('Course', models.DO_NOTHING, to_field='program_id', related_name='enrollment_program_set')
    student = models.ForeignKey('Student', models.DO_NOTHING)
    enrollment_date = models.DateTimeField()
    status = models.CharField(max_length=10)
    school_year = models.DateField()
    checked_by = models.ForeignKey('User', models.DO_NOTHING, db_column='checked_by', null=True, db_comment='Role must be Department')
    released_by = models.ForeignKey('User', models.DO_NOTHING, db_column='released_by', related_name='enrollment_released_by_set', null=True, db_comment='Role must be Registrar')

    class Meta:
        managed = False
        db_table = 'enrollment'


class Grade(models.Model):
    id = models.IntegerField(primary_key=True)
    student = models.ForeignKey('Student', models.DO_NOTHING)
    course_code = models.ForeignKey('Course', models.DO_NOTHING, db_column='course_code')
    program = models.ForeignKey('Course', models.DO_NOTHING, to_field='program_id', related_name='grade_program_set')
    grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, db_comment='1.00 to 5.00 scale')
    instructor = models.ForeignKey('Instructor', models.DO_NOTHING)
    remarks = models.CharField(max_length=21, null=True)

    class Meta:
        managed = False
        db_table = 'grade'


class Instructor(models.Model):
    id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, null=True)
    suffix = models.CharField(max_length=55, null=True)
    email = models.CharField(max_length=55, null=True)
    contact_number = models.CharField(max_length=55, null=True)
    password = models.CharField(max_length=55, null=True)

    class Meta:
        managed = False
        db_table = 'instructor'


class Permission(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=55, null=True)
    description = models.TextField(null=True)

    class Meta:
        managed = False
        db_table = 'permission'


class Program(models.Model):
    id = models.CharField(primary_key=True, max_length=55)
    abbreviation = models.CharField(max_length=55, null=True)
    description = models.CharField(max_length=255, null=True)

    class Meta:
        managed = False
        db_table = 'program'


class Role(models.Model):
    id = models.IntegerField(primary_key=True)
    role = models.CharField(max_length=55, null=True, db_comment='Registrar, Admin, Department and Student')
    description = models.TextField(null=True)

    class Meta:
        managed = False
        db_table = 'role'


class RolePermission(models.Model):
    permission = models.OneToOneField('Permission', models.DO_NOTHING, primary_key=True)  # The composite primary key (permission_id, role_id) found, that is not supported. The first column is selected.
    role = models.ForeignKey('Role', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'role_permission'
        unique_together = (('permission', 'role'),)


class Schedule(models.Model):
    id = models.IntegerField(primary_key=True)
    course_code = models.ForeignKey('Course', models.DO_NOTHING, db_column='course_code')
    program = models.ForeignKey('Course', models.DO_NOTHING, to_field='program_id', related_name='schedule_program_set')
    instructor = models.ForeignKey('Instructor', models.DO_NOTHING)
    from_time = models.TimeField(null=True)
    to_time = models.TimeField(null=True)
    category = models.CharField(max_length=3, null=True)
    day = models.CharField(max_length=9, null=True)
    room = models.CharField(max_length=55, null=True)

    class Meta:
        managed = False
        db_table = 'schedule'


class Student(models.Model):
    id = models.BigIntegerField(primary_key=True)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    middle_name = models.CharField(max_length=55, null=True)
    suffix = models.CharField(max_length=55, null=True)
    year_level = models.IntegerField(null=True)
    section = models.IntegerField(null=True)
    program = models.ForeignKey('Program', models.DO_NOTHING)
    address = models.ForeignKey('Address', models.DO_NOTHING, null=True)
    old_or_new = models.CharField(max_length=3, null=True)
    status = models.CharField(max_length=11)
    birth_date = models.DateField(null=True)
    gender = models.CharField(max_length=17, null=True)
    contact_number = models.CharField(max_length=55, null=True)
    email = models.CharField(max_length=55, null=True)

    class Meta:
        managed = False
        db_table = 'student'


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=55, null=True)
    last_name = models.CharField(max_length=55, null=True)
    middle_name = models.CharField(max_length=55, null=True)
    suffix = models.CharField(max_length=55, null=True)
    email = models.CharField(max_length=55, null=True)
    contact_number = models.CharField(max_length=55, null=True)
    username = models.CharField(unique=True, max_length=55, db_comment='Student will use their student number for username. Registrar, Admin and Department has different format for username')
    password = models.CharField(max_length=55)
    role = models.ForeignKey('Role', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user'
