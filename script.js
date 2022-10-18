// time and date
let now = new Date();
let day = document.querySelector(".currentDay");
let hour = document.querySelector(".currentHour");
let minute = document.querySelector(".currentMinute");
let enteredHour = now.getHours();
if (enteredHour < 10) {
  enteredHour = "0" + enteredHour;
}
let enteredMinute = now.getMinutes();
if (enteredMinute < 10) {
  enteredMinute = "0" + enteredMinute;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let enteredDay = days[now.getDay()];
day.innerHTML = enteredDay + " ";
hour.innerHTML = enteredHour;
minute.innerHTML = enteredMinute + " ";

function formatForecastHourly(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let hours = [
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ];
  return hours[hour];
}

function formatForecastDaily(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  return days[day];
}

function displayForecast(response) {
  //Hourly forecast
  let hourlyForecast = response.data.hourly;
  let hourlyForecastElement = document.querySelector(".dayForecast");

  let hourlyForecastHTML = `<div class="row justify-content-center">`;
  hourlyForecast.forEach(function (forecastHour, index) {
    if (index < 10) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `
          <div class="col-1 hourlyBox hvr-grow">
            <div class="hourForecast">${formatForecastHourly(
              forecastHour.dt
            )}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastHour.weather[0].icon
            }@2x.png" alt="" width="60"/>
            <div class="hourlyTemperature">${Math.round(
              forecastHour.temp
            )}°</div>
      </div>
      `;
    }
  });

  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
  // Daily forecast
  let dailyForecast = response.data.daily;
  let dailyForecastElement = document.querySelector(".weekForecast");
  let dailyForecastHTML = `<div class="row justify-content-center">`;
  dailyForecast.forEach(function (forecastDaily, index) {
    if (index < 5) {
      dailyForecastHTML =
        dailyForecastHTML +
        `
  <div class="col-1 weeklyBox hvr-grow">
   <div class="dailyForecast">${formatForecastDaily(forecastDaily.dt)}</div>
 <img src="http://openweathermap.org/img/wn/${
   forecastDaily.weather[0].icon
 }@2x.png" alt="" width="60"/>
            <div class="dailyTemperature">
            <span class="low" id="daily-low">
            ${Math.round(forecastDaily.temp.min)}°<span/>
            |
            <span class="high" id="daily-high">
            ${Math.round(forecastDaily.temp.max)}°<span/>
            </div>
            </div>
  `;
    }
  });

  dailyForecastHTML = dailyForecastHTML + `</div>`;
  dailyForecastElement.innerHTML = dailyForecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c9a673fc2e2ccbea1cacfb6a4a47e6f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=e0a5a97de9a0b7a951e9d154a8f9bad8&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  let temperatureElement = document.querySelector("#temp-reading");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  document.querySelector(".currentDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".tempFeel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#current-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather.description);

  // Display background
  let backgroundElement = document.getElementById("my-video");
  let mainWeather = response.data.weather[0].main;
  backgroundElement.src = "src/images/other.mp4";
  if (mainWeather == "Clouds") {
    backgroundElement.src = "src/images/clouds.mp4";
  } else if (mainWeather == "Clear") {
    backgroundElement.src = "src/images/clear.mp4";
  } else if (mainWeather == "Thunderstorm") {
    backgroundElement.src = "src/images/thunderstorm.mp4";
  } else if (mainWeather == "Snow") {
    backgroundElement.src = "src/images/snow.mp4";
  } else if (mainWeather == "Mist") {
    backgroundElement.src = "src/images/mist.mp4";
  } else if (mainWeather == "Haze") {
    backgroundElement.src = "src/images/haze.mp4";
  } else if (mainWeather == "Drizzle") {
    backgroundElement.src = "src/images/drizzle.mp4";
  } else if (mainWeather == "Rain") {
    backgroundElement.src = "src/images/rain.mp4";
  } else if (mainWeather == "Sand") {
    backgroundElement.src = "src/images/sand.mp4";
  } else if (mainWeather == "Smoke") {
    backgroundElement.src = "src/images/smoke.mp4";
  } else {
    backgroundElement.src = "src/images/other.mp4";
  }

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "c9a673fc2e2ccbea1cacfb6a4a47e6f7";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-value").value;
  searchCity(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-reading");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-reading");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector(".searchForm");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

searchCity("johannesburg");
