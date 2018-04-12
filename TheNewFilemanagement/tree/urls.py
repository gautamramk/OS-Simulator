from django.contrib import admin
from django.urls import path
from django.conf.urls import include,url
from . import views


urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^u/(?P<user_id>[0-9]+)/$',views.user,name='user'),
    url(r'^d/(?P<dir_id>[0-9]+)/$', views.directory, name='directory'),
    url(r'^d/new/(?P<dir_id>[0-9]+)/$', views.new),
    url(r'^d/del/(?P<dir_id>[0-9]+)/$', views.de),
    url(r'^f/new/(?P<dir_id>[0-9]+)/$',views.new_file,name='newfile'),
    url(r'^f/text/(?P<file_id>[0-9]+)/$',views.texteditor, name='texteditor'),
    url(r'^f/del/(?P<dir_id>[0-9]+)/$', views.delete, name='delfile'),
    #url(r'^f/(?P<file_id>[0-9]+)/$', views.file, name='file'),
]