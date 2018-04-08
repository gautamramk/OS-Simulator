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
        fields = ['name']



class newFolder(forms.Form):
    name = forms.CharField(max_length=50)

class newfile(forms.Form):
    name = forms.CharField(max_length = 50)

class delFolder(forms.Form):
    '''def __init__(self, *args, **kwargs):
        super(delFolder,self).__init__(*args, **kwargs)
        dir_id = kwargs.pop('dir_id', None)
        print("dir id is", dir_id)
        if dir_id :
            dir_id = int(dir_id)
            self.fields['folders'].queryset = Folder.objects.filter(parent=Folder.objects.get(id=dir_id))
'''
    folders = forms.ModelChoiceField(queryset=Folder.objects.all())
    # CHOICES = []
    # for folder in Folder.objects.all():
    #     CHOICES.append((folder.name,folder))
    # folders = forms.ChoiceField(choices = CHOICES, widget=forms.RadioSelect())
    
    
    
