from django.shortcuts import render

from .models import (
    Categoria,Ubicacion,
    Oferta
)

# Create your views here.
def index(request):
    titulo = 'PORTAL DE OFERTAS LABORALES'
    lista_categorias = Categoria.objects.all()
    lista_ubicaciones = Ubicacion.objects.all()
    lista_ofertas = Oferta.objects.all()
    
    context = {
        'titulo':titulo,
        'categorias':lista_categorias,
        'ubicaciones':lista_ubicaciones,
        'ofertas':lista_ofertas
    }
    return render(request,'index.html',context)


def ofertas_por_categoria(request,categoria_id):
    titulo = 'PORTAL DE OFERTAS LABORALES'
    objCategoria = Categoria.objects.get(pk=categoria_id)
    lista_ofertas = Oferta.objects.filter(categoria=objCategoria)
    lista_categorias = Categoria.objects.all()
    lista_ubicaciones = Ubicacion.objects.all()
    
    context = {
        'titulo':titulo,
        'categorias':lista_categorias,
        'ubicaciones':lista_ubicaciones,
        'ofertas':lista_ofertas
    }
    return render(request,'index.html',context)
