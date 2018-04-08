from django.shortcuts import render, get_object_or_404
from .models import User, Folder, File
from .forms import *
from django.urls import reverse
from django.http import HttpResponseRedirect


# Create your views here.
def index(request):
    users = User.objects.all()
    context = {'users': users}
    return render(request, 'tree/index.html', context)


def user(request, user_id):
    maindir = Folder.objects.get(name=User.objects.get(id=user_id))
    # folders = get_object_or_404(Folder,user__id=user_id)
    # return HttpResponseRedirect(reverse("tree_app:directory",maindir.id))
    return HttpResponseRedirect("/d/" + str(maindir.id) + "/")


def directory(request, dir_id):
    curdir = Folder.objects.get(id=dir_id)
    folders = Folder.objects.filter(parent=curdir)
    files = File.objects.filter(parent=curdir)

    path = []
    cur = curdir
    while cur.parent is not None:
        path.append(cur)
        cur = cur.parent
    path.append(cur)
    path.reverse()
    path.pop()
    form = newFolder()
    print(dir_id)
    df = delFolder()
    print(df.fields)
    fileform = newfile()
    df.fields['folders'].queryset = Folder.objects.filter(parent=Folder.objects.get(id=dir_id))
    context = {'folders': folders, 'files': files, 'path': path, 'cur': curdir,
               'newfolder': form, 'delfolder': df, 'newfile' : fileform}

    return render(request, 'tree/tree.html', context)


def new(request, dir_id):
    nf = newFolder(request.POST)
    if nf.is_valid():
        newdir = Folder()
        newdir.parent = Folder.objects.get(id=dir_id)
        newdir.user = Folder.objects.get(id=dir_id).user
        newdir.name = nf.cleaned_data.get("name")
        newdir.save()
    return HttpResponseRedirect("/d/" + str(dir_id))


def de(request, dir_id):
    df = delFolder(request.POST)
    print(df)
    if df.is_valid():
        df.cleaned_data.get('folders').delete()
        #Folder.objects.filter(id=df).delete()
    return HttpResponseRedirect("/d/" + str(dir_id))

def new_file(request, dir_id):
    file = newfile(request.POST)
    if file.is_valid():
        new = File()
        new.name = file.cleaned_data.get("name")
        new.parent = Folder.objects.get(id=dir_id)
        print(new.name+'////////////////////////////////////////////////////////////////////////////////////////////')
        new.save()
        file_id = new.id

        current = Folder.objects.get(id=dir_id)
        files = File.objects.filter(parent=current)
        folders = Folder.objects.filter(parent=current)

        path = []
        cur = current
        while cur.parent is not None:
            path.append(cur)
            cur = cur.parent
        path.append(cur)
        path.reverse()
        path.pop()
        form = newFolder()
        print(dir_id)
        df = delFolder()
        print(df.fields)
        fileform = newfile()
        df.fields['folders'].queryset = Folder.objects.filter(parent=Folder.objects.get(id=dir_id))
        context = {'folders':folders,'files': files, 'path': path, 'cur': current,
                   'newfolder': form, 'delfolder': df, 'newfile': fileform}

        return render(request, 'tree/tree.html', context)


def texteditor(request, file_id):
    print(file_id+'///////////////////////////////////////////////////////////////////')
    file = File.objects.get(id=file_id)
    context = {'file' : file}
    return render(request, 'tree/texteditor.html', context)