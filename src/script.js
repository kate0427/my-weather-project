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

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = tempElement.innerHTML; //this is a string
  temperature = Number(temperature); //to convert to number
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", changeToFahrenheit);

function changeToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
} //add the changing wind to mph function, add feelsliketemp function
let celciusButton = document.querySelector("#celcius-link");
celciusButton.addEventListener("click", changeToCelcius);

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
  document.querySelector(
    "#humidity"
  ).innerHTML = ` ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
}

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
