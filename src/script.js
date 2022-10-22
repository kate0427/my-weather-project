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
  let apiURL5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiURL5days}`).then(show5daysWeather);
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

function show5daysWeather(response) {
  document.querySelector("#day2-temp").innerHTML = Math.round(
    response.data.list[7].main.temp
  );
  document
    .querySelector("#day2-img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[7].weather[0].icon}@2x.png`
    );
  document
    .querySelector("#day2-img")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.list[7].weather[0].description}@2x.png`
    );
  document.querySelector("#day3-temp").innerHTML = Math.round(
    response.data.list[15].main.temp
  );
  document
    .querySelector("#day3-img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[15].weather[0].icon}@2x.png`
    );
  document
    .querySelector("#day3-img")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.list[15].weather[0].description}@2x.png`
    );
  document.querySelector("#day4-temp").innerHTML = Math.round(
    response.data.list[23].main.temp
  );
  document
    .querySelector("#day4-img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[23].weather[0].icon}@2x.png`
    );
  document
    .querySelector("#day4-img")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.list[23].weather[0].description}@2x.png`
    );
  document.querySelector("#day5-temp").innerHTML = Math.round(
    response.data.list[31].main.temp
  );
  document
    .querySelector("#day5-img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[31].weather[0].icon}@2x.png`
    );
  document
    .querySelector("#day5-img")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.list[31].weather[0].description}@2x.png`
    );
  document.querySelector("#day6-temp").innerHTML = Math.round(
    response.data.list[39].main.temp
  );
  document
    .querySelector("#day6-img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[39].weather[0].icon}@2x.png`
    );
  document
    .querySelector("#day6-img")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.list[39].weather[0].description}@2x.png`
    );
}

function searchLisbon(event) {
  event.preventDefault();
  searchCity("lisbon");
  document.querySelector("#search-input").setAttribute("value", "Lisbon");
}
document.querySelector("#city1-lisbon").addEventListener("click", searchLisbon);

function searchParis(event) {
  event.preventDefault();
  searchCity("paris");
  document.querySelector("#search-input").setAttribute("value", "Paris");
}
document.querySelector("#city2-paris").addEventListener("click", searchParis);

function searchLondon(event) {
  event.preventDefault();
  searchCity("london");
  document.querySelector("#search-input").setAttribute("value", "London");
}
document.querySelector("#city3-london").addEventListener("click", searchLondon);

function searchWarsaw(event) {
  event.preventDefault();
  searchCity("warsaw");
  document.querySelector("#search-input").setAttribute("value", "Warsaw");
}
document.querySelector("#city4-warsaw").addEventListener("click", searchWarsaw);

function searchPrague(event) {
  event.preventDefault();
  searchCity("prague");
  document.querySelector("#search-input").setAttribute("value", "Prague");
}
document.querySelector("#city5-prague").addEventListener("click", searchPrague);

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = Number(tempElement.innerHTML);
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  let feelsLikeTempElement = document.querySelector("#feels-like-temperature");
  let feelsLikeTemp = Number(feelsLikeTempElement.innerHTML);
  feelsLikeTempElement.innerHTML = Math.round((feelsLikeTemp * 9) / 5 + 32);
  document.querySelector("#feels-like-metrics").innerHTML = `℉`;
}

function changeToMph(event) {
  event.preventDefault();
  let windElement = document.querySelector("#wind");
  let windKm = Number(windElement.innerHTML);
  windElement.innerHTML = ` ${Math.round(windKm / 1.609)} `;
  document.querySelector("#wind-metrics").innerHTML = `mph`;
}

function change5DaystoFahrenheit(event) {
  event.preventDefault();
  let tempDays2 = document.querySelector("#day2-temp");
  let tempDaysCelcius2 = Number(tempDays2.innerHTML);
  tempDays2.innerHTML = Math.round((tempDaysCelcius2 * 9) / 5 + 32);
  document.querySelector("#temp-metrics2").innerHTML = `℉`;
  let tempDays3 = document.querySelector("#day3-temp");
  let tempDaysCelcius3 = Number(tempDays3.innerHTML);
  tempDays3.innerHTML = Math.round((tempDaysCelcius3 * 9) / 5 + 32);
  document.querySelector("#temp-metrics3").innerHTML = `℉`;
  let tempDays4 = document.querySelector("#day4-temp");
  let tempDaysCelcius4 = Number(tempDays4.innerHTML);
  tempDays4.innerHTML = Math.round((tempDaysCelcius4 * 9) / 5 + 32);
  document.querySelector("#temp-metrics4").innerHTML = `℉`;
  let tempDays5 = document.querySelector("#day5-temp");
  let tempDaysCelcius5 = Number(tempDays5.innerHTML);
  tempDays5.innerHTML = Math.round((tempDaysCelcius5 * 9) / 5 + 32);
  document.querySelector("#temp-metrics5").innerHTML = `℉`;
  let tempDays6 = document.querySelector("#day6-temp");
  let tempDaysCelcius6 = Number(tempDays6.innerHTML);
  tempDays6.innerHTML = Math.round((tempDaysCelcius6 * 9) / 5 + 32);
  document.querySelector("#temp-metrics6").innerHTML = `℉`;
}

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", changeToFahrenheit);
fahrenheitButton.addEventListener("click", changeToMph);
fahrenheitButton.addEventListener("click", change5DaystoFahrenheit);

function changeToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = Number(tempElement.innerHTML);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  let feelsLikeTempElement = document.querySelector("#feels-like-temperature");
  let feelsLikeTemp = Number(feelsLikeTempElement.innerHTML);
  feelsLikeTempElement.innerHTML = Math.round(((feelsLikeTemp - 32) * 5) / 9);
  document.querySelector("#feels-like-metrics").innerHTML = `℃`;
}

function changeToKmph(event) {
  event.preventDefault();
  let windElement = document.querySelector("#wind");
  let windMph = Number(windElement.innerHTML);
  windElement.innerHTML = ` ${Math.round(windMph * 1.609)} `;
  document.querySelector("#wind-metrics").innerHTML = `km/h`;
}

function change5DaystoCelcius(event) {
  event.preventDefault();
  let tempDays2 = document.querySelector("#day2-temp");
  let tempDaysCelcius2 = Number(tempDays2.innerHTML);
  tempDays2.innerHTML = Math.round(((tempDaysCelcius2 - 32) * 5) / 9);
  document.querySelector("#temp-metrics2").innerHTML = `℃`;
  let tempDays3 = document.querySelector("#day3-temp");
  let tempDaysCelcius3 = Number(tempDays3.innerHTML);
  tempDays3.innerHTML = Math.round(((tempDaysCelcius3 - 32) * 5) / 9);
  document.querySelector("#temp-metrics3").innerHTML = `℃`;
  let tempDays4 = document.querySelector("#day4-temp");
  let tempDaysCelcius4 = Number(tempDays4.innerHTML);
  tempDays4.innerHTML = Math.round(((tempDaysCelcius4 - 32) * 5) / 9);
  document.querySelector("#temp-metrics4").innerHTML = `℃`;
  let tempDays5 = document.querySelector("#day5-temp");
  let tempDaysCelcius5 = Number(tempDays5.innerHTML);
  tempDays5.innerHTML = Math.round(((tempDaysCelcius5 - 32) * 5) / 9);
  document.querySelector("#temp-metrics5").innerHTML = `℃`;
  let tempDays6 = document.querySelector("#day6-temp");
  let tempDaysCelcius6 = Number(tempDays6.innerHTML);
  tempDays6.innerHTML = Math.round(((tempDaysCelcius6 - 32) * 5) / 9);
  document.querySelector("#temp-metrics6").innerHTML = `℃`;
}

let celciusButton = document.querySelector("#celcius-link");
celciusButton.addEventListener("click", changeToCelcius);
celciusButton.addEventListener("click", changeToKmph);
celciusButton.addEventListener("click", change5DaystoCelcius);

searchCity("Kyiv");
