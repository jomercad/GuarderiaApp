from django.contrib import admin
from .models import Alumno, Padre, Asistencia, Actividad

# Registrar los modelos
admin.site.register(Alumno)
admin.site.register(Padre)
admin.site.register(Asistencia)
admin.site.register(Actividad)