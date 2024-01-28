from django.contrib import admin
from .models import User

# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'email',
        'first_name',
        'last_name',
        'is_superuser',
    )

admin.site.register(User, UsersAdmin)