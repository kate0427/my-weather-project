function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let data = date.getDate();

  return `${day}, ${month} ${data}`;
}
let fullDate = document.querySelector("#date");
let currentDate = new Date();
fullDate.innerHTML = formatDate(currentDate);

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatTime(currentDate);

function changeToMph(event) {
  event.preventDefault();
  let windElement = document.querySelector("#wind");
  let windKm = windElement.innerHTML;
  windKm = Number(windKm);
  windElement.innerHTML = ` ${Math.round(windKm / 1.609)} `;
  document.querySelector("#wind-metrics").innerHTML = `mph`;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = tempElement.innerHTML; //this is a string
  temperature = Number(temperature); //to convert to number
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  let feelsLikeTempElement = document.querySelector("#feels-like-temperature");
  let feelsLikeTemp = feelsLikeTempElement.innerHTML;
  feelsLikeTemp = Number(feelsLikeTemp);
  feelsLikeTempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  document.querySelector("#feels-like-metrics").innerHTML = `℉`;
}

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", changeToFahrenheit);
fahrenheitButton.addEventListener("click", changeToMph);

function changeToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  let feelsLikeTempElement = document.querySelector("#feels-like-temperature");
  let feelsLikeTemp = feelsLikeTempElement.innerHTML;
  feelsLikeTemp = Number(feelsLikeTemp);
  feelsLikeTempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  document.querySelector("#feels-like-metrics").innerHTML = `℃`;
}

function changeToKmph(event) {
  event.preventDefault();
  let windElement = document.querySelector("#wind");
  let windMph = windElement.innerHTML;
  windMph = Number(windMph);
  windElement.innerHTML = ` ${Math.round(windMph * 1.609)} `;
  document.querySelector("#wind-metrics").innerHTML = `km/h`;
}

let celciusButton = document.querySelector("#celcius-link");
celciusButton.addEventListener("click", changeToCelcius);
celciusButton.addEventListener("click", changeToKmph);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getInput);

function getInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = `${searchInput.value}`;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "e80f735c22f9cc78cdfe65b74bebba0a";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiURL}`).then(showWeather);
}
function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like-temperature").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = ` ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
}

function searchLisbon(event) {
  event.preventDefault();
  searchCity("lisbon");
}
document.querySelector("#city1-lisbon").addEventListener("click", searchLisbon);

function searchParis(event) {
  event.preventDefault();
  searchCity("paris");
}
document.querySelector("#city2-paris").addEventListener("click", searchParis);

function searchLondon(event) {
  event.preventDefault();
  searchCity("london");
}
document.querySelector("#city3-london").addEventListener("click", searchLondon);

function searchWarsaw(event) {
  event.preventDefault();
  searchCity("warsaw");
}
document.querySelector("#city4-warsaw").addEventListener("click", searchWarsaw);

function searchPrague(event) {
  event.preventDefault();
  searchCity("prague");
}
document.querySelector("#city5-prague").addEventListener("click", searchPrague);

function getPosition(position) {
  let apiKey = "e80f735c22f9cc78cdfe65b74bebba0a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiLink).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

searchCity("Kyiv");
