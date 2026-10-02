from django.urls import path
from . import views

urlpatterns = [
    path("", views.inicio, name="inicio"),
    path("menu/", views.menu, name="menu"),
    path("hamburguesas/", views.hamburguesas, name="hamburguesas"),
    path("perros/", views.perros, name="perros"),
    path("salchipapas/", views.salchipapas, name="salchipapas"),
    path("pollos/", views.pollos, name="pollos"),
    
]