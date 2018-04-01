from django.shortcuts import render, get_object_or_404
from .models import User, Folder, File


# Create your views here.
def index(request):
    users = User.objects.all()
    context = {'users': users}
    return render(request, 'tree/index.html', context)


def user(request, user_id):
    folders = Folder.objects.filter(user__id=user_id)
    #folders = get_object_or_404(Folder,user__id=user_id)
    context = {'folders': folders,
               'name':folders[0].user.name}
    return render(request, 'tree/user.html', context)
