import {
    currentCity,
    currentCountry
} from './apiFunctions';

// only 2 forecast days available in the free subscription to WeatherAPI
const forecastLimit = 2
const cityDisplay = document.getElementById("city_display");
const currentConditionImg = document.getElementById("current_weather_img");
const currentHumidity = document.getElementById("current_humidity");
const currentWind = document.getElementById("current_wind");
const currentTemp = document.getElementById("current_temp");
const currentDate = document.getElementById("current_date");
const currentConditionIcon = document.getElementById("current_weather_img");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
const day = days[date.getDay()];


function displayWeatherData (weatherData, currentCity) {
    displayCurrentWeatherData(weatherData, currentCity, currentCountry);
    displayForecastedWeatherData(weatherData);
};

/**
 * 
 * Display the real-time weather data in the selected city
 * 
 */
function displayCurrentWeatherData(weatherData, currentCity, currentCountry){
    currentDate.textContent = `${day} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    cityDisplay.textContent = `${currentCity}, ${currentCountry}`;
    currentHumidity.textContent = `Humidity: ${weatherData[0].humidity}%`;
    currentWind.textContent = `Wind: ${weatherData[0].windSpeed} km/h, ${weatherData[0].windDir}`;
    currentConditionIcon.src = `https:${weatherData[0].conditionIcon}`;
    currentTemp.textContent = `${weatherData[0].temp} °C`
};

/**
 * 
 * Display the 2-days forecast in the selected city
 * 
 */
function displayForecastedWeatherData(weatherData, currentCity, currentCountry){
    // Tu as vraiment besoin du forecast limit ici ? Tu pourrais pas juste faire weatherData.length ?
    // Si tu fais ça ça vaut quand même le coup de parler de la limite de 2 jours en commentaires quelque part
    // Bon après, ton nombre d'éléments est en dur dans ton index.html en fait... donc il vaut mieux laisser tel quel finalement !
    for (let i = 1; i <= forecastLimit; i++) { 
        let forecastedWeatherData = weatherData[i];
        let day = document.getElementById("day"+i+"_date");
        let forecastedConditionImg = document.getElementById("day"+i+"_weather_img");
        let forecastedMinTemp =  document.getElementById("day"+i+"_min_temp");
        let forecastedMaxTemp =  document.getElementById("day"+i+"_max_temp");
        let forecastedWind =  document.getElementById("day"+i+"_wind");
        let forecastedHumidity = document.getElementById("day"+i+"_humidity");

        day.textContent = days[date.getDay() <= 5  ? date.getDay()+i : 0+(i-1)];
        forecastedConditionImg.src = `https:${forecastedWeatherData.conditionIcon}`;
        forecastedMinTemp.textContent = `${forecastedWeatherData.minTemp} °C`;
        forecastedMaxTemp.textContent = `${forecastedWeatherData.maxTemp} °C`;
        forecastedWind.textContent  = `Wind: ${forecastedWeatherData.maxWindSpeed} km/h`;
        forecastedHumidity.textContent = `Humidity: ${forecastedWeatherData.avgHumid}%`;
    }
};

export {
    displayWeatherData
};