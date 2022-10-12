//api

function displayWeather(response) {
  document.querySelector("li.location").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temp-reading");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  document.querySelector(".currentDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".tempFeel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather.description);
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

let form = document.querySelector(".searchForm");
form.addEventListener("submit", handleSubmit);

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

//current hourly forecast

function displayForecast() {
  let forecastElement = document.querySelector(".dayForecast");
  let hours = [
    "12 AM",
    "3 AM",
    "6 AM",
    "9 AM",
    "12 PM",
    "3 PM",
    "6 PM",
    "9 PM",
    "11 PM",
  ];
  let forecastHTML = `<div class="row justify-content-center">`;
  hours.forEach(function (hour) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-1">
            <div class="hourForecast">${hour}</div>
            <img src="http://openweathermap.org/img/wn/09n@2x.png" alt="" width="60"/>
            <div class="hourlyTemperature">18°</div>
      </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//celcius to fahrenheit

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
let celciusTemperature = null;

displayForecast();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);
