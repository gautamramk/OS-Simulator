#we create all the urls here and then we import this file in the OSProjects urls.py folder.
from django.conf.urls import url
# . below means look in current directory
# and then import the views.py file
#into this urls.py
from . import views

urlpatterns = [
    url(r'^', views.index, name = 'index'),
]

