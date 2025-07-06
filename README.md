# Book API
Este proyecto implementa una API de gestión de biblioteca utilizando un servidor TCP en Node.js.

**Configuración**
1. Clona este repositorio.
2. Ejecuta npm install para instalar las dependencias.
3. Inicia el servidor con npm start o node server.js.

**Uso**
Inicia el cliente con node client.js y utiliza los siguientes comandos:

GET BOOKS: Obtiene la lista de libros.
ADD BOOK {"title": "Nuevo Libro", "author": "Autor", "year": 2023}: Añade un nuevo libro.
GET AUTHORS: Obtiene la lista de autores.
ADD AUTHOR {"name": "Nuevo Autor", "nationality": "Nacionalidad"}: Añade un nuevo autor.
SEARCH AUTHOR BY NAME Nombre: Busca autores por nombre.
SEARCH AUTHOR BY NATIONALITY Nacionalidad: Busca autores por nacionalidad.
GET PUBLISHERS: Obtiene la lista de editoriales.
ADD PUBLISHER {"name": "Nueva Editorial", "country": "País"}: Añade una nueva editorial.

**Estructura del Proyecto**

server.js: Implementación del servidor TCP.
client.js: Cliente TCP para interactuar con el servidor.
controllers/: Controladores para manejar la lógica de la aplicación.
models/: Modelos para la gestión de datos.
data/: Archivos JSON para persistencia de datos.