from django.contrib import admin
from django.urls import path
from django.conf.urls import include,url
from . import views

app_name='tree_app'


urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^(?P<user_id>[0-9]+)/$',views.user,name='user'),
]