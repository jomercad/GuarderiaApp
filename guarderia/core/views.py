# from django.shortcuts import render
from rest_framework import viewsets
from .models import Alumno, Padre, Actividad
from .serializers import AlumnoSerializer, PadreSerializer, ActividadSerializer

# Create your views here.

class AlumnoViewSet(viewsets.ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer


class PadreViewSet(viewsets.ModelViewSet):
    queryset = Padre.objects.all()
    serializer_class = PadreSerializer


class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
