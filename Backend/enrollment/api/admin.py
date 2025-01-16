from django.contrib import admin
from .models import *
from django.db.models import CharField, TextField, IntegerField, DateField  # Import necessary field types
from api.serializers import *

class BaseAdmin(admin.ModelAdmin):
    """
    A base admin class that overrides the delete functionality.
    Assumes the model has a `deleted` Boolean field.
    """
    list_per_page = 10  # limit data per page
    
    def get_queryset(self, request):
        """
        Exclude deleted records (deleted=True) by default.
        """
        qs = super().get_queryset(request)
        return qs.filter(deleted=False)

    def delete_queryset(self, request, queryset):
        """
        Override the bulk delete action to perform soft delete.
        """
        queryset.update(deleted=True)
        # self.message_user(request, f"Successfully deleted {queryset.count()} record(s).")

    def delete_model(self, request, obj):
        """
        Override the delete action for a single object to perform soft delete.
        """
        obj.deleted = True
        obj.save()

    @admin.action(description="Delete selected records")
    def delete(self, request, queryset):
        """
        Provide a custom delete action to replace the default delete functionality.
        """
        queryset.update(deleted=True)
        self.message_user(request, f"Successfully deleted {queryset.count()} record(s).")

    actions = ["delete"]  # Use only the custom delete action

    def get_actions(self, request):
        """
        Remove the default delete action.
        """
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]  # Remove Django's default delete action
        return actions


class Searchable(BaseAdmin):
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


class StudentAdmin(Searchable, BaseAdmin):
    @admin.display(description="ID")
    def id(obj):
        return f"{obj.id}"

    @admin.display(description="Name")
    def upper_case_name(obj):
        return f"{obj.last_name}, {obj.first_name} {obj.middle_name or ''}".upper()

    @admin.display(description="Year Level & Section")
    def year_section(obj):
        return f"{obj.program.id} {obj.year_level} - {obj.section}"
    
    list_display = [id, upper_case_name, year_section]
    
# class AddressAdmin(Searchable, BaseAdmin):
#     list_display = ["id", "barangay", "street", "city", "province"]
#     list_filter = ["city", "province"]

class EnrollmentAdmin(Searchable, BaseAdmin):
    # list_display = ["id", "barangay", "street", "city", "province"]
    list_filter = ["student", "course", "school_year"]

class AcadTermBillingAdmin(Searchable, BaseAdmin):
    # list_display = ["id", "barangay", "street", "city", "province"]
    list_display = ["billing__name", "price", "year_level", "semester"]
    list_filter = ["year_level", "semester"]

class GradeAdmin(Searchable, BaseAdmin):
    # @admin.display(description="Year Level & Section")
    # def year_section(obj):
    #     return f"{obj.program.id} {obj.year_level} - {obj.section}"
    
    list_display = ["student_id", "course__code", "grade", "course__year_level", "course__semester"]
    list_filter = ["student", "course__year_level", "course__semester"]


# admin.site.register(Address, AddressAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Instructor, Searchable)
admin.site.register(Course, Searchable)
admin.site.register(Enrollment, EnrollmentAdmin)
admin.site.register(Grade, GradeAdmin)
admin.site.register(Receipt, Searchable)
admin.site.register(Sectioning, Searchable)
admin.site.register(Program, Searchable)
admin.site.register(AcadTermBilling, AcadTermBillingAdmin)
# admin.site.register(BillingList)
admin.site.register(Enrollment_Date, Searchable)
