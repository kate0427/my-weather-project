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
  // let apiURL5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  // axios.get(apiURL5days).then(show5daysWeather);
}

function getDaysForecast(coordinates) {
  let apiDaysURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=96771e971243152d6b8948878c26adde&units=metric`;
  axios.get(apiDaysURL).then(displayDaysWeather);
}

let celciusTemperature = null;
let feelsLikeTemperature = null;
let windKmH = null;
let tempDay2 = null;

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  celciusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
  feelsLikeTemperature = response.data.main.feels_like;
  document.querySelector("#feels-like-temperature").innerHTML =
    Math.round(feelsLikeTemperature);
  document.querySelector(
    "#humidity"
  ).innerHTML = ` ${response.data.main.humidity}%`;
  windKmH = response.data.wind.speed;
  document.querySelector("#wind").innerHTML = ` ${Math.round(windKmH)}`;
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

  getDaysForecast(response.data.coord);
}
searchCity("Kyiv");

function displayDaysWeather(response) {
  console.log(response.data.daily);
  let daysWeather = document.querySelector("#days-weather");
  let days = ["Sun", "Mon", "Tue", "Wed", "Fri"];
  let daysWeatherHTML = `<div class="row">`;

  days.forEach(function (day) {
    daysWeatherHTML =
      daysWeatherHTML +
      `         <div class="col">
              <div class="daysWeatherDate">${day}</div>
              <img class="daysImg" alt="..." src="..." id="day2-img" />
              <p class="daysTemperature">
                <span class="daysTempMax" id="day2-temp"></span>
                <span class="daysTempMin"> 12</span>
              </p>
              </div>`;
  });

  daysWeatherHTML = daysWeatherHTML + `</div>`;
  daysWeather.innerHTML = daysWeatherHTML;
}

// function show5daysWeather(response) {
//   tempDay2 = response.data.list[7].main.temp;
//   document.querySelector("#day2-temp").innerHTML = `${Math.round(tempDay2)}°`;
//   document
//     .querySelector("#day2-img")
//     .setAttribute(
//       "src",
//       `http://openweathermap.org/img/wn/${response.data.list[7].weather[0].icon}@2x.png`
//     );
//   document
//     .querySelector("#day2-img")
//     .setAttribute(
//       "alt",
//       `http://openweathermap.org/img/wn/${response.data.list[7].weather[0].description}@2x.png`
//     );
// }

function displayCitiesLink(city) {
  let citiesLinks = document.querySelector("#cities-link");
  let cities = ["Lisbon", "Paris", "London", "Warsaw", "Prague"];
  let citiesLinksHTML = `<div class="row">`;
  cities.forEach(function (city) {
    citiesLinksHTML =
      citiesLinksHTML +
      `                   <div class="col">
            <a id=${city} href="">${city}</a></div>`;
  });

  citiesLinksHTML = citiesLinksHTML + `</div>`;
  citiesLinks.innerHTML = citiesLinksHTML;
}
displayCitiesLink();

//cities function

// function searchLisbon(event) {
//   event.preventDefault();
//   searchCity("lisbon");
//   document.querySelector("#search-input").setAttribute("value", "Lisbon");
// }
// document.querySelector("#lisbon").addEventListener("click", searchLisbon);

// function searchParis(event) {
//   event.preventDefault();
//   searchCity("paris");
//   document.querySelector("#search-input").setAttribute("value", "Paris");
// }
// document.querySelector("#paris").addEventListener("click", searchParis);

// function searchLondon(event) {
//   event.preventDefault();
//   searchCity("london");
//   document.querySelector("#search-input").setAttribute("value", "London");
// }
// document.querySelector("#london").addEventListener("click", searchLondon);

// function searchWarsaw(event) {
//   event.preventDefault();
//   searchCity("warsaw");
//   document.querySelector("#search-input").setAttribute("value", "Warsaw");
// }
// document.querySelector("#warsaw").addEventListener("click", searchWarsaw);

// function searchPrague(event) {
//   event.preventDefault();
//   searchCity("prague");
//   document.querySelector("#search-input").setAttribute("value", "Prague");
// }
// document.querySelector("#prague").addEventListener("click", searchPrague);

//converter

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
  let feelsLikeTempElement = document.querySelector("#feels-like-temperature");
  feelsLikeTempElement.innerHTML = Math.round(
    (feelsLikeTemperature * 9) / 5 + 32
  );
  document.querySelector("#feels-like-metrics").innerHTML = `℉`;
  celciusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
}

function changeToMph(event) {
  event.preventDefault();
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    windKmH / 1.609
  )} `;
  document.querySelector("#wind-metrics").innerHTML = `mph`;
}

// function change5DaystoFahrenheit(event) {
//   event.preventDefault();
//   document.querySelector("#day2-temp").innerHTML = `${Math.round(
//     (tempDay2 * 9) / 5 + 32
//   )}°`;
// }

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", changeToFahrenheit);
fahrenheitButton.addEventListener("click", changeToMph);

function changeToCelcius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#feels-like-temperature").innerHTML =
    Math.round(feelsLikeTemperature);
  document.querySelector("#feels-like-metrics").innerHTML = `℃`;
  celciusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
}

function changeToKmph(event) {
  event.preventDefault();
  document.querySelector("#wind").innerHTML = ` ${Math.round(windKmH)} `;
  document.querySelector("#wind-metrics").innerHTML = `km/h`;
}

// function change5DaystoCelcius(event) {
//   event.preventDefault();
//   document.querySelector("#day2-temp").innerHTML = `${Math.round(tempDay2)}°`;
// }

let celciusButton = document.querySelector("#celcius-link");
celciusButton.addEventListener("click", changeToCelcius);
celciusButton.addEventListener("click", changeToKmph);
