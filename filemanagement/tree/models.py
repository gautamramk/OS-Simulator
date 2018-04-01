from django.db import models


# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Folder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class File(models.Model):
    name = models.CharField(max_length=50)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
