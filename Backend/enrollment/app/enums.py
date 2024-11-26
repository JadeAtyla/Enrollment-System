from django.db import models

class GENDER(models.TextChoices):
    MALE = 'MALE'
    FEMALE = 'FEMALE'
    PREFER_NOT_TO_SAY = 'PREFER NOT TO SAY'
    
class OLD_OR_NEW_STUDENT(models.TextChoices):
    OLD = 'OLD'
    NEW = 'NEW'
    
class STUDENT_REG_STATUS(models.TextChoices):
    REGULAR = 'REGULAR'
    IRREGULAR = 'IRREGULAR'
    TRANFEREE = 'TRANFEREE'
    RETURNEE = 'RETURNEE'
    NEW = 'NEW STUDENT'
    
class LAB_OR_LEC(models.TextChoices):
    LAB = 'LAB'
    LEC = 'LEC'
    
class SCHEDULE_DAY(models.TextChoices):
    MONDAY = 'MONDAY'
    TUESDAY = 'TUESDAY'
    WEDNESDAY ='WEDNESDAY'
    THURSDAY = 'THURSDAY'
    FRIDAY = 'FRIDAY' 
    SATURDAY = 'SATURDAY'
    SUNDAY = 'SUNDAY'
    
class ENROLLMENT_STATUS(models.TextChoices):
    ENROLLED = 'ENROLLED'
    WAITLISTED = 'WAITLISTED'
    
class GRADE_REMARKS(models.TextChoices):
    PASSED = 'PASSED'
    FAILED = 'FAILED'
    INCOMPLETE = 'INCOMPLETE'
    UNCONDITIONAL_FAILURE = 'UNCONDITIONAL_FAILURE'
    NOT_GRADED_YET = 'NOT_GRADED_YET'
    
class USER_ROLES(models.TextChoices):
    ADMIN = 'ADMIN'
    REGISTRAR = 'REGISTRAR'
    DEPARTMENT = 'DEPARTMENT'
    STUDENT = 'STUDENT'