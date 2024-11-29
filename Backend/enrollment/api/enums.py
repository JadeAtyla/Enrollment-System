from django.db import models

# for Student.gender
class STUDENT_GENDER(models.TextChoices):
    MALE = 'MALE'
    FEMALE = 'FEMALE'
    PREFER_NOT_TO_SAY = 'PREFER NOT TO SAY'

# for Student.category
class OLD_OR_NEW_STUDENT(models.TextChoices):
    OLD = 'OLD'
    NEW = 'NEW'

# for Student.status
class STUDENT_REG_STATUS(models.TextChoices):
    REGULAR = 'REGULAR'
    IRREGULAR = 'IRREGULAR'
    TRANFEREE = 'TRANFEREE'
    RETURNEE = 'RETURNEE'
    NEW = 'NEW STUDENT'

# for Schedule.category
class LAB_OR_LEC(models.TextChoices):
    LAB = 'LAB'
    LEC = 'LEC'

# for Schedule.day
class SCHEDULE_DAY(models.TextChoices):
    MONDAY = 'MONDAY'
    TUESDAY = 'TUESDAY'
    WEDNESDAY ='WEDNESDAY'
    THURSDAY = 'THURSDAY'
    FRIDAY = 'FRIDAY' 
    SATURDAY = 'SATURDAY'
    SUNDAY = 'SUNDAY'

# for Enrollment.status
class ENROLLMENT_STATUS(models.TextChoices):
    ENROLLED = 'ENROLLED'
    WAITLISTED = 'WAITLISTED'
    
# for Grade.remarks
class GRADE_REMARKS(models.TextChoices):
    PASSED = 'PASSED'
    FAILED = 'FAILED'
    INCOMPLETE = 'INCOMPLETE'
    UNCONDITIONAL_FAILURE = 'UNCONDITIONAL_FAILURE'
    NOT_GRADED_YET = 'NOT_GRADED_YET'

# for Program.program
class PROGRAM(models.TextChoices):
    NO_PROGRAM_YET = 'NO_PROGRAM_YET'
    BSIT = 'BSIT'
    BSCS = 'BSCS'


# class USER_ROLES(models.TextChoices):
#     ADMIN = 'ADMIN'
#     REGISTRAR = 'REGISTRAR'
#     DEPARTMENT = 'DEPARTMENT'
#     STUDENT = 'STUDENT'