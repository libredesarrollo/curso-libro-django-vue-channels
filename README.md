# Proyecto: Consumir Django Channels O FastAPI con Vue.js

Este proyecto es una aplicación frontend desarrollada con **Vue.js** para demostrar cómo consumir una API en tiempo real construida con **Django Channels**. La aplicación permite a los usuarios autenticarse, unirse a salas y recibir mensajes o alertas en tiempo real enviados desde un backend de Django.

El backend utiliza **Django REST Framework (DRF)** para gestionar la autenticación y la serialización de datos, mientras que **Django Channels** se encarga de la comunicación WebSocket.

---

### Cursos y Libros de DesarrolloLibre

Este proyecto es un ejemplo práctico extraído del contenido educativo de **Desarrollolibre**. Si quieres aprender a construir aplicaciones completas como esta, consulta los siguientes recursos:

- 📚 **Libro: Primeros Pasos con Django** - Una guía completa para iniciarte en el desarrollo web con el framework de Python más popular.
  - [Ver el libro](https://www.desarrollolibre.net/libros/primeros-pasos-django)

- 🎓 **Curso: Desarrollo Web con Django y Python** - Aprende a crear aplicaciones web robustas y escalables desde cero.
  - [Ver el curso](https://www.desarrollolibre.net/blog/python/curso-django)

- 📚 **Libro: Primeros Pasos con FastAPI** - Una guía completa para iniciarte en el desarrollo web con el framework de Python del momento.
  - [Ver el libro](https://www.desarrollolibre.net/libros/libro-primeros-pasos-con-fastapi)

- 🎓 **Curso: Desarrollo Web con FastAPI** - Aprende a crear aplicaciones APIs robustas y escalables desde cero.
  - [Ver el curso](https://www.desarrollolibre.net/blog/python/curso-primeros-pasos-con-fastapi)

---

## 🚀 Características

- **Comunicación en Tiempo Real**: Conexión a un servidor WebSocket para recibir datos al instante.
- **Autenticación de Usuarios**: Sistema de login para acceder a las funcionalidades protegidas.
- **Salas de Mensajes**: Interfaz para seleccionar y unirse a diferentes salas de chat o notificación.
- **Componentes Modulares**: La aplicación está estructurada en componentes reutilizables de Vue para una mejor organización (`Login`, `Logout`, `Rooms`, `Messages`).
- **Integración con DRF**: Consume endpoints de una API REST para la gestión de usuarios y datos.

## 🛠️ Tecnologías Utilizadas (Frontend)

- **Vue.js**: Framework progresivo para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo frontend moderna y ultrarrápida.
- **Axios**: Cliente HTTP para realizar peticiones a la API REST del backend.
- **API WebSocket**: Interfaz nativa del navegador para la comunicación en tiempo real.

## 📋 Requisitos del Backend

Este frontend está diseñado para funcionar con un backend específico construido con:

- Python
- Django/FastAPI
- Django REST Framework (DRF)/FastAPI
- Django Channels/FastAPI

## ⚙️ Instalación y Puesta en Marcha (Frontend)

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instalar las dependencias del proyecto:**
    ```bash
    npm install
    ```

3.  **Configurar la URL del backend:**
    Asegúrate de que las peticiones de Axios y la conexión WebSocket apunten a la dirección correcta de tu servidor Django.

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  Abre tu navegador y visita `http://localhost:5173` (o el puerto que indique Vite).

---

Desarrollado como parte del material educativo de [Desarrollolibre.net](https://www.desarrollolibre.net).
