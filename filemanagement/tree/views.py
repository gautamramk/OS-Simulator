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
    #folders = get_object_or_404(Folder,user__id=user_id)
    #return HttpResponseRedirect(reverse("tree_app:directory",maindir.id))
    return HttpResponseRedirect("/d/"+str(maindir.id)+"/")

def directory(request, dir_id):
    curdir = Folder.objects.get(id=dir_id)
    folders = Folder.objects.filter(parent=curdir)
    files = Folder.objects.filter(parent=curdir)

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
    df.fields['folders'].queryset = Folder.objects.filter(parent=Folder.objects.get(id=dir_id))
    context = {'folders':folders, 'files':files, 'path':path, 'cur':curdir, 'newfolder':form, 'delfolder':df}

    return render(request, 'tree/tree.html', context)

def new(request,dir_id):
    nf = newFolder(request.POST)
    if nf.is_valid():
        newdir = Folder()
        newdir.parent = Folder.objects.get(id=dir_id)
        newdir.user = Folder.objects.get(id=dir_id).user
        newdir.name = nf.cleaned_data.get("name")
        newdir.save()
    return HttpResponseRedirect("/d/"+str(dir_id))

def de(request,dir_id):
    df = delFolder(request.POST)
    if df.is_valid():
        df.cleaned_data.get('folders').delete()
    return HttpResponseRedirect("/d/"+str(dir_id))