// Obtenemos cada respectivo campo
const wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    weatherPart = wrapper.querySelector(".weather-part"),
    wIcon = weatherPart.querySelector("img"),
    arrowBack = wrapper.querySelector("header i");

let api;
let apiKey = 'YOUR_API_KEY_HERE'; // Key para poder usar la API

// Evento Keyup para el campo de Texto
inputField.addEventListener("keyup", e => {
    // Si el usuario presiona Enter y el campo no está vacío
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
        startTimer(); // Iniciamos el temporizador al hacer una búsqueda
    }
});

// Evento Click para la geolocalización
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) { // Si el navegador soporta la geolocalización
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        startTimer(); // Iniciamos el temporizador al obtener la ubicación
    } else {
        alert("Tu navegador no soporta Geolocalización API");
    }
});

// Función para hacer la API con los datos que le pasamos
function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

// Si funciona la geolocalización se hará la búsqueda por medio de esta
function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

// En el caso que se encuentre algún error recurrirá a esta función
function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

// Función encargada de hacer la petición a la API
function fetchData() {
    infoTxt.innerText = "Obteniendo detalles del clima...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        infoTxt.innerText = "Algo salió mal";
        infoTxt.classList.replace("pending", "error");
    });
}

// Función encargada de mostrar los datos obtenidos de la API
function weatherDetails(info) {
    if (info.cod == "404") { // Si el usuario ingresa una ciudad que no existe
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} no es un nombre de ciudad válido`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { temp, feels_like, humidity } = info.main;

        // Usando iconos personalizados según el id que nos da la API
        if (id == 800) {
            wIcon.src = "icons/clear.svg";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "icons/storm.svg";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "icons/snow.svg";
        } else if (id >= 701 && id <= 781) {
            wIcon.src = "icons/haze.svg";
        } else if (id >= 801 && id <= 804) {
            wIcon.src = "icons/cloud.svg";
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            wIcon.src = "icons/rain.svg";
        }

        // Pasando la información a los respectivos campos
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

// Evento para regresar a la pantalla principal
arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

// Función para iniciar el temporizador
function startTimer() {
    // Limpiamos cualquier temporizador previo
    clearInterval(window.weatherTimer);
    // Iniciamos un nuevo temporizador que se ejecuta cada 5 minutos (300,000 ms)
    window.weatherTimer = setInterval(() => {
        fetchData();
    }, 300000);
}
