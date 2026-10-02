from django.shortcuts import render


def inicio(request):
    return render(request, "pedidos/inicio.html")


def menu(request):
    return render(request, "pedidos/menu.html")


def hamburguesas(request):
    return render(request, "pedidos/hamburguesas.html")

def perros(request):
    return render(request, "pedidos/perros.html")


def salchipapas(request):
    return render(request, "pedidos/salchipapas.html")


def pollos(request):
    return render(request, 'pedidos/pollos.html')