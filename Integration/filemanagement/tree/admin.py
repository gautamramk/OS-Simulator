from django.contrib import admin
from .models import User,File,Folder

# Register your models here.
admin.site.register(User)
admin.site.register(File)
admin.site.register(Folder)