//api

function displayWeather(response) {
  document.querySelector("li.location").innerHTML = response.data.name;
  document.querySelector("#temp-reading").innerHTML = Math.round(
    response.data.main.temp
  );
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
  document.querySelector(".currentWeatherImage").innerHTML =
    response.data.main.temp;
}

// city display
/*
function enterCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  let cityDisplay = document.querySelector("li.location");
  cityDisplay.innerHTML = input.value;
  let cityName = input.value;
  console.log(cityName);
}
*/

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

/*
function displayTemp(response) {
  let test = enterCity();
  console.log(test);
}

  cityDisplay.innerHTML = input.value;
  let apiKey = "c9a673fc2e2ccbea1cacfb6a4a47e6f7";
  console.log(apiKey);

  console.log(cityDisplay.innerHTML);
  let cityName = cityDisplay.innerHTML;
  console.log(cityName);
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  axios.get(weatherUrl).then(displayTemp);
}
*/
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

//celcius to fahrenheit

function convert(event) {
  event.preventDefault();
  // let celciusTemp = document.querySelector(".currentTemp");
  let tempSymbol = document.querySelector("#temp-symbol");
  if (tempSymbol.innerHTML === "°C") {
    let celciusTemp = 22;
    celciusTemp = celciusTemp * (9 / 5) + 32;
    let tempReading = document.querySelector("#temp-reading");
    tempReading.innerHTML = Math.round(celciusTemp);
    tempSymbol.innerHTML = "°F";
  } else {
    let tempReading = document.querySelector("#temp-reading");
    tempReading.innerHTML = 22;
    tempSymbol.innerHTML = "°C";
  }
}

let celciusToFahrenheit = document.querySelector("#temp-symbol");
celciusToFahrenheit.addEventListener("click", convert);
