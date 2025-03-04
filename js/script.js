// Variaveis e selecao de elementos
const apikey = "5a78cc39037a9dcd418d8480e57a2536";
const apiCountryUrl = "https://flagcdn.com/w320/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funcoes
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    try {
        const res = await fetch(apiWeatherURL);
        if (!res.ok) {
            throw new Error(`Erro: ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
        return null;
    }
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    if (!data) return;

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagcdn.com/w320/${data.sys.country.toLowerCase()}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    const windSpeed = data.wind.speed ? (data.wind.speed * 3.6).toFixed(1) : 'N/A'; // Converte de m/s para km/h e formata para 1 casa decimal
    windElement.innerText = `${windSpeed} km/h`;

    // Remover a classe 'hide' para exibir os dados do clima
    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});