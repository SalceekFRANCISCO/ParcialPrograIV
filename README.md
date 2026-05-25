# Sala De Juegos

## Francisco Salceek Muñoz

#### Enlace de proyecto:

<https://parcial-progra-iv-fs.vercel.app/login>

### Tecnologias usadas:

<ul>

**<li>Angular</li>**
**<li>Supabase</li>**
**<li>Typescript</li>**
**<li>Html</li>**
**<li>Css</li>**

</ul>

## Sprint 1

En este primer sprint se implementaron los componentes: **Login**, **Home**, **Register** y **Who I am**.
Este ultimo trae los datos del alumno desde la api de github y los muestra en pantalla.
Se implemento la navegación entre componentes y se incluyo un favicon personalizado.

## Sprint 2

En este segundo sprint se implemento la logica del componente **Login** quien ahora permite a los usuarios iniciar sesion en caso de tener una cuenta, o la opcion de registrarse en la pagina a traves del componente **Register**.
Se le dio funcionalidad al componente **Home** que es donde tendremos el listado de juegos para acceder.

## Sprint 3

En este tercer sprint se implementaron los juegos **Hanged** y **Greater or Lesser**, junto con el componente de **Chat** global.
Para el Ahorcado se desarrolló una interfaz interactiva basada puramente en botones en pantalla para la selección de letras. En Mayor o Menor se integró la lógica de predicción con una baraja de naipes. La Sala de Chat permite la comunicación en tiempo real entre usuarios logueados, guardando los mensajes y actualizando la vista automáticamente sin necesidad de recargar la página gracias a las suscripciones en tiempo real de la base de datos. Al finalizar cada partida, se registran los puntajes y estadísticas correspondientes en el servidor.

## Sprint 4

En este cuarto sprint se sumaron los últimos dos juegos de la aplicación: **Quiz** y el **Juego propio**.
Preguntados consume datos de una API externa para generar las trivias de preguntas y respuestas de manera dinámica. El juego propio fue diseñado desde cero implementando mecánicas personalizadas y sus reglas fueron detalladas en la sección "Quién Soy". Además, se desarrolló el componente **Score**, el cual presenta un listado detallado con cuatro tablas (una por cada juego) donde se muestran los desempeños de todos los usuarios ordenados de mejor a peor puntuación.
