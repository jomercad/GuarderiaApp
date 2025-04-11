from django.urls import path
from . import views

urlpatterns = [
    path('alumnos/', views.lista_alumnos, name='lista_alumnos'),
    path('alumnos/crear/', views.crear_alumno, name='crear_alumno'),
    path('alumnos/eliminar/<int:id>/', views.eliminar_alumno, name='eliminar_alumno'),
    path('alumnos/actualizar/<int:id>/', views.actualizar_alumno, name='actualizar_alumno'),
    path('padres/', views.lista_padres, name='lista_padres'),
    path('actividades/', views.lista_actividades, name='lista_actividades'),
    path('asistencia/<int:alumno_id>/', views.tomar_asistencia, name='tomar_asistencia'),
]