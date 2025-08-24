# Consumir Django Channels con Vue — Aplicación de Mensajes de Alertas

https://www.desarrollolibre.net/libros/primeros-pasos-django

https://www.desarrollolibre.net/blog/python/curso-django

Este fragmento extraído del curso *"Curso y Libro desarrollo web con Django 5 y Python 3"* de Desarrollolibre explica cómo integrar Django Channels y Vue para crear una aplicación de alertas en tiempo real :contentReference[oaicite:0]{index=0}.

---

## 1. Presentación del módulo
- En este módulo se plantea una aplicación donde Django (con DRF y Channels) envía alertas en tiempo real, y el frontend en Vue las consume dinámicamente :contentReference[oaicite:1]{index=1}.

## 2. Instalación y configuración
- Se incluyen las dependencias necesarias para Django Channels y la configuración asociada, incluyendo posible uso de un backend **In-Memory Channel** en desarrollo :contentReference[oaicite:2]{index=2}.
- Se integran Django REST Framework (DRF), Django Channels y Vue en una sola arquitectura.

## 3. Desarrollo de la aplicación de mensajes de alertas
- Se construye una aplicación que permite transmitir mensajes desde Django hacia Vue en tiempo real, lo que facilita construir interfaces tipo alertas o notificaciones :contentReference[oaicite:3]{index=3}.

---

##  Estructura sugerida del README.md

```markdown
## Módulo: DRF, Django Channels y Vue – Aplicación de Mensajes de Alertas

###  Descripción
En este módulo se desarrolla una funcionalidad de **alertas en tiempo real** utilizando una API con Django REST Framework, conectada a un sistema de mensajería en tiempo real mediante Django Channels, y consumida desde un frontend en Vue.

###  Backend (Django)
1. **Dependencias necesarias**:
   ```bash
   pip install channels djangorestframework
   # En desarrollo: In-Memory Channel layer
