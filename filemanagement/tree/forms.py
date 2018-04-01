from django import forms

from .models import User, Folder, File


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name']


class FolderForm(forms.ModelForm):
    class Meta:
        model = Folder
        fields = ['user', 'name']


class FileForm(forms.ModelForm):
    class Meta:
        model = File
        fields = ['name','folder']
