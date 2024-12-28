from django.contrib import admin
from .models import *
from django.db.models import CharField, TextField, IntegerField, DateField  # Import necessary field types
from api.serializers import *

class Searchable(admin.ModelAdmin):
    def get_search_fields(self, request):
        """
        Dynamically generate search_fields based on the model fields
        for CharFields and other string fields (TextFields).
        """
        model_fields = [
            field.name for field in self.model._meta.get_fields()
            if isinstance(field, (CharField, TextField))  # Add more types as needed
        ]

        if 'id' not in model_fields:
            model_fields.append('id')

        return model_fields
    
@admin.display(description="ID")
def id(obj):
    return f"{obj.id}"

@admin.display(description="Name")
def upper_case_name(obj):
    return f"{obj.last_name}, {obj.first_name} {obj.middle_name or ''}".upper()

@admin.display(description="Year Level & Section")
def year_section(obj):
    return f"{obj.program.id} {obj.year_level} - {obj.section}"

class StudentAdmin(Searchable, admin.ModelAdmin):
    list_display = [id, upper_case_name, year_section]
    
class AddressAdmin(Searchable, admin.ModelAdmin):
    list_display = ["id", "barangay", "street", "city", "province"]
    list_filter = ["city", "province"]


admin.site.register(Address, AddressAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Instructor, Searchable)
admin.site.register(Course, Searchable)
admin.site.register(Enrollment, Searchable)
admin.site.register(Grade, Searchable)
admin.site.register(Receipt, Searchable)
admin.site.register(Sectioning, Searchable)
admin.site.register(Program, Searchable)
admin.site.register(AcadTermBilling)
admin.site.register(BillingList)
