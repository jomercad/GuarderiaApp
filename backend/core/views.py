from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Alumno, Padre, Asistencia, Actividad
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

@csrf_exempt
def lista_alumnos(request):
    if request.method == 'GET':
        alumnos = Alumno.objects.all().values('id', 'nombre', 'edad', 'genero', 'padre__nombre')
        return JsonResponse(list(alumnos), safe=False)

@csrf_exempt
def crear_alumno(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        alumno = Alumno(
            nombre=data['nombre'],
            edad=data['edad'],
            genero=data['genero'],
            padre_id=data['padre_id']
        )
        alumno.save()
        return JsonResponse({'id': alumno.id, 'nombre': alumno.nombre}, status=201)

@csrf_exempt
def eliminar_alumno(request, id):
    if request.method == 'DELETE':
        try:
            alumno = Alumno.objects.get(id=id)
            alumno.delete()
            return JsonResponse({'status': 'success'}, status=204)
        except Alumno.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Alumno no encontrado'}, status=404)

@csrf_exempt
def actualizar_alumno(request, id):
    if request.method == 'PUT':
        try:
            alumno = Alumno.objects.get(id=id)
            data = json.loads(request.body)
            alumno.nombre = data.get('nombre', alumno.nombre)
            alumno.edad = data.get('edad', alumno.edad)
            alumno.genero = data.get('genero', alumno.genero)
            alumno.padre_id = data.get('padre_id', alumno.padre_id)
            alumno.save()
            return JsonResponse({'status': 'success', 'id': alumno.id}, status=200)
        except Alumno.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Alumno no encontrado'}, status=404)
def lista_padres(request):
    padres = Padre.objects.all()
    return render(request, 'core/lista_padres.html', {'padres': padres})

def lista_actividades(request):
    actividades = Actividad.objects.all()
    return render(request, 'core/lista_actividades.html', {'actividades': actividades})

def tomar_asistencia(request, alumno_id):
    alumno = get_object_or_404(Alumno, id=alumno_id)
    if request.method == 'POST':
        fecha = request.POST.get('fecha')
        presente = request.POST.get('presente') == 'on'
        Asistencia.objects.create(alumno=alumno, fecha=fecha, presente=presente)
        return JsonResponse({'status': 'success'})
    return render(request, 'core/tomar_asistencia.html', {'alumno': alumno})