from django.db import models


# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Folder(models.Model):
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='folders', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class File(models.Model):
    parent = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='files', null=True)
    name = models.CharField(max_length=50)

    # folder = models.ForeignKey(Folder, on_delete=models.CASCADE)

    def __str__(self):
        return self.name