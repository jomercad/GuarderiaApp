from django.db import models

# Create your models here.

class Padre(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return self.nombre

class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    genero = models.CharField(max_length=10)
    padre = models.ForeignKey(Padre, on_delete=models.CASCADE, related_name='alumnos')

    def __str__(self):
        return self.nombre

class Asistencia(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    fecha = models.DateField()
    presente = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.alumno.nombre} - {self.fecha}"

class Actividad(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha = models.DateTimeField()
    recordatorio = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo