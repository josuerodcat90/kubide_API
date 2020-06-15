# Kubide Notes API
Simple API para crear, obtener y gestionar notas.

## Requisitos:
#### 1). Tener instalado NodeJs en su equipo.
#### 2). Tener instalado MongoDB, ya sea como servicio o de manera normal, si esta normal es necesario ejecutar el comando `mongod` en la terminal para iniciar el servicio de MongoDB.
#### 3). Tener un gestor de peticiones HTTP como PostMan, PostWoman, Insomnia, etc.
#### 4). Opcional pero recomendado, configurar los headers en su gestor de peticiones HTTP, se utiliza por lo regular un `KEY: Content-Type` y un `VALUE: application/json`, para poder tener un tipado mas correcto cuando se interactue con la API.

## instrucciones de inicio:
#### 1). Clonar este repositorio en su equipo local.
#### 2). Ejecutar el comando `npm install -S` para instalar todas las dependencias.
#### 3). Una vez hecho lo anterior se requiere ejecutar el comando `npm start` para iniciar el servidor.

## Como interactuar con la API:
#### La API se encuentra corriendo en el puerto que se le indica en su terminal en el log que fue creado al iniciar el servidor, seria algo como esto: `http://localhost:4000/`.
#### Al ingresar con el gestor de peticiones HTTP al enlance mencionada anteriormente se mostrara un mensaje indicando la ruta inicial de la API.

## Funciones de la API:
#### 1). Crear notas: Para crear una nota nos situamos en el gestor de peticiones HTTP de tu preferencia (yo usare PostMan), nos situamos en la opcion de `Body` y seleccionamos `raw`, utilizamos el metodo `POST`, le colocamos la ruta `http://localhost:4000/notas` de la API y le brindamos la siguiente informacion como ejemplo: 

````
{
  "title": "Mi primera nota", //titulo de la nota
  "description": "Esta es una nota de prueba para la API", //cuerpo o descripción de la nota.
  "username": "@josuerodcat90" //el usuario que creo la nota
}
````
#### Al enviar esta informacion obtendremos como resultado un objeto `JSON` con la informacion de la nota que hemos guardado en la base de datos.

#### 2). Consultar todas las notas: Para consultar todas las notas que hemos creado cambiamos el metodo a `GET` y hacemos una peticion a la ruta `http://localhost:4000/api/notas/` para obtener un arreglo `JSON` cont todas las notas que tengamos al momento en la base de datos.

#### 3). Consultar una nota en especifico: Para consultar una sola nota es necesario hacer una peticion `GET` a la ruta `http://localhost:4000/api/notas/` añadiendole el parametro `id` de la nota que queremos consultar, como por ejemplo: 
````
http://localhost:4000/api/notas/5ee77441c871e34f402d02d9
````
Con esto obtendremos la nota que pertenece a ese ObjectId nada mas.

#### 4). Marcar una nota como favorita: Para marcar una nota como favorita es necesario hacer una peticion `PUT` en la ruta `http://localhost:4000/api/notas/megusta/` añadiendole el parametro `id` de la nota que queremos marcar como favorita y tambien brindandole como cuerpo de la peticion lo siguiente: 
````
http://localhost:4000/api/notas/megusta/5ee77441c871e34f402d02d9

{
  "liked": true //cambiamos el valor booleano a true, por defecto se crea en false.
}
````
Con esto marcamos la nota indicada como favorita, se puede desmarcar como favorita enviando `false` en vez de `true` en la opcion `liked`.

#### 5).Consultar las notas favoritas: Para consultar todas las notas que hemos marcado como favoritas, cambiamos el metodo a `GET` y hacemos una peticion a la ruta `http://localhost:4000/api/notas/favoritas` para obtener un arreglo `JSON` cont todas las notas que tengan la propiedad `liked: true` en la base de datos.

#### 6). Como un extra se ha creado una ruta y un metodo para poder editar el titulo y el contenido de una nota, para ello se necesita cambiar el metodo a `PUT` y colocamos la ruta `http://localhost:4000/api/notas/editar` añadiendole el `id` de la nota a editar y la siguiente informacion como ejemplo:
````
http://localhost:4000/api/notas/editar/5ee77441c871e34f402d02d9

{
  {
  "title": "Mi primera nota modificada", //titulo de la nota
  "description": "Esta es una nota modificada de prueba para la API", //cuerpo o descripción de la nota.
}
}
````
Al enviar esto al servidor obtendremos como respuesta un objeto `JSON` con la informacion nueva que hemos guardado en la nota.

#### 7). Como un extra-extra se creo un metodo en la API para eliminar notas, para eliminar cambiamos el moetodo del gestor a `DELETE` y colocamos la ruta `http://localhost:4000/api/notas/` y le añadimos como parametro el `id` de la nota a eliminar, como por ejemplo:
````
http://localhost:4000/api/notas/5ee77441c871e34f402d02d9
````
Al enviar la peticion de esta manera la API nos respondera con un mensaje diciendo que la nota fue eliminada correctamente.

#### Espero llene vuestras expectativas.
#### Un Saludo.
