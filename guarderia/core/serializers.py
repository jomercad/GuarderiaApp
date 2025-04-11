from rest_framework import serializers
from .models import Alumno, Padre, Actividad

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = ['id', 'nombre', 'edad', 'genero', 'padre']


class PadreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Padre
        fields = ['id', 'nombre', 'telefono', 'email']


class ActividadSerializer(serializers.ModelSerializer):
    alumnos = AlumnoSerializer(many=True)

    class Meta:
        model = Actividad
        fields = ['id', 'nombre', 'fecha', 'descripcion', 'alumnos']
