Weather App

Esta aplicación web muestra el clima actual de una ubicación específica, utilizando la API de OpenWeatherMap. Puedes buscar el clima por ciudad o permitir que la aplicación obtenga tu ubicación actual para mostrar el clima. La aplicación también realiza actualizaciones automáticas cada 5 minutos.
Estructura del Proyecto

El proyecto consta de dos archivos principales:

    index.html: Contiene la estructura HTML de la aplicación.
    app.js: Contiene la lógica en JavaScript para interactuar con la API y manejar las actualizaciones automáticas del clima.
    style.css: Contiene todos los estilos de la página
    carpeta icons: contiende los iconos utilizados

Requisitos

Para ejecutar la aplicación, solo necesitas un navegador web moderno. No se requieren dependencias adicionales ni configuraciones de servidor.
Configuración de la API

    Obtener la clave de la API:
    Debes obtener una clave API de OpenWeatherMap. Puedes registrarte y obtener una clave gratuita en el siguiente enlace: OpenWeatherMap API Key. (En este caso yo he brindado mi API KEY para que no tenga que hacer este paso)

    Configurar la clave API:
    Una vez que tengas tu clave API, debes agregarla en el archivo app.js en la siguiente línea:

    javascript

    let apiKey = 'YOUR_API_KEY_HERE';

    Reemplaza 'YOUR_API_KEY_HERE' con tu clave API.

Ejecución de la Aplicación

    Descargar o clonar el repositorio:
    Descarga o clona el repositorio a tu máquina local.

    Abrir el archivo HTML:
    Abre el archivo index.html en tu navegador web preferido.

    Uso de la Aplicación:
        Buscar por ciudad: Escribe el nombre de una ciudad en el campo de texto y presiona "Enter".
        Usar geolocalización: Haz clic en el botón de ubicación para obtener el clima basado en tu ubicación actual.

La aplicación mostrará la información del clima y se actualizará automáticamente cada 5 minutos.
Licencia

Este proyecto se distribuye bajo la licencia MIT. Para más información, consulta el archivo LICENSE.
