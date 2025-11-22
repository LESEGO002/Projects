const API_KEY = "";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("searchBtn");
const forecastDiv = document.getElementById("forecast");
const locationDiv = document.getElementById("location");
const descDiv = document.getElementById("desc");
const tempDiv = document.getElementById("temp");
const metaDiv = document.getElementById("meta");
const iconIMG = document.getElementById("icon");
const feelsDiv = document.getElementById("feels");
const pressureDiv = document.getElementById("pressure");
const sunDiv = document.getElementById("sun");
const unitBtn = document.getElementById("unitBtn");

let isCelsius = true;

async function fetchWeather(city) {
    if(!city) return alert("Please enter a city name");

    document.body.classList.add("loading");

    const units = isCelsius ? "metric" : "imperial";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json();

    if(data.cod === "200") {
        alert("City not found. Please try again.");
        document.body.classList.remove("loading");
        return;
    }

    renderweather(data);
    document.body.classList.remove("loading");
}

function renderweather(data) {
    const { name, sys, weather, main, wind } = data;

    locationDiv.innerText = `${name}, ${sys.country}`;
    descDiv.innerText = weather[0].description;
    tempDiv.innerText = `${Math.round(main.temp)}°${isCelsius ? "C" : "F"}`;
    metaDiv.innerText = `Humidity: ${main.humidity}% | Wind Speed: ${wind.speed} ${isCelsius ? "m/s" : "mph"}`;
    iconIMG.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    feelsDiv.innerText = `Feels like: ${Math.round(main.feels_like)}°${isCelsius ? "C" : "F"}`;
    pressureDiv.innerText = `Pressure: ${main.pressure} hPa`;
    sunDiv.innerText = `Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()} | Sunset: ${new Date(sys.sunset * 1000).toLocaleTimeString()}`;
}

function formatTime(unix){
    const date = new Date(unix * 1000);
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

searchBtn.addEventListener("click", () => getweather(cityInput.value));
cityInput.addEventListener("keyup", (e) => e.key === "Enter" && getweather(cityInput.value) , null);
unitBtn.addEventListener("click", () => {
    isCelsius = !isCelsius;
    unitBtn.innerText = isCelsius ? "Switch to °F" : "Switch to °C";
    if(locationDiv.innerText) getweather(locationDiv.textContent);
});
quickButtons.forEach(button => button.addEventListener("click", () => getweather(e.target.data)));