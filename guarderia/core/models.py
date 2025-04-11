from django.db import models

# Create your models here.

class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    genero = models.CharField(max_length=10)
    padre = models.ForeignKey('Padre', related_name='alumnos', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Padre(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return self.nombre


class Actividad(models.Model):
    nombre = models.CharField(max_length=100)
    fecha = models.DateField()
    descripcion = models.TextField()
    alumnos = models.ManyToManyField(Alumno, related_name='actividades')

    def __str__(self):
        return self.nombre