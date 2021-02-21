var localStorageArr = JSON.parse(localStorage.getItem("cities"));
var myCityList = $(".cityList");
var apiKey = "c3de2d2c940e3b4a114f178684ecc6fd";

$(".submit-btn").click(function () {
  var city = $(".city-input").val();

  var currentCityUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  var forecastSite =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey;

  if (city === "") {
    console.log("no input");
  } else {
    getWeather(city, currentCityUrl);
    get5Day(city, forecastSite);
  }

  // end of the function
});

// for (i = 0; i < localStorageArr.length; i++) {
//   // var listItem = document.createElement("li");
//   // listItem.setAttribute("class", "list-group-item");
//   // listItem.textContent = localStorageArr[i];
//   var listItem = document.querySelectorAll(".list-group-item")
//   listItem.addEventListener("click", function (event) {
//     var currentCityUrl =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     event.target.textContent +
//     "&appid=" +
//     apiKey;
//     getWeather(event.target.textContent, currentCityUrl);
//   });
//   myCityList.append(listItem);
// }
async function getWeather(city, currentCityUrl) {
  var currentCityUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  const resp = await fetch(currentCityUrl, {
    method: "GET",
  });

  const data = await resp.json();
  var localCities = JSON.parse(localStorage.getItem("cities")) || [];
  localCities.push(city);
  var localList = localStorage.setItem("cities", JSON.stringify(localCities));
  var listItem = document.createElement("li");
  listItem.setAttribute("class", "list-group-item");
  listItem.addEventListener("click", function () {
    getWeather(city);
  });
  listItem.textContent = city;
  myCityList.append(listItem);

  var iconNum = data.weather[0].icon;
  var cityWeather = data.main.temp;
  var fahrenheit = Math.trunc((cityWeather - 273.15) * 1.8 + 32);
  var currentDay = $("#currentDay");
  var cityDisplay = document.querySelector(".city");
  cityDisplay.textContent = city;
  var dateDisplay = document.querySelector(".date");
  dateDisplay.textContent = moment().format("(MM-DD-YYYY)");
  var iconSite = "https://openweathermap.org/img/wn/";
  var iconLink = iconSite + iconNum + "@2x.png";
  var iconDisplay = document
    .querySelector(".icon")
    .setAttribute("src", iconLink);
  var tempDisplay = document.querySelector(".temp");
  tempDisplay.textContent =
    "Current Temperature : " + fahrenheit + "\u00B0" + "F";
  var humidityDisplay = document.querySelector(".humidity");
  humidityDisplay.textContent = "Humidity : " + data.main.humidity + "%";
  var windDisplay = document.querySelector(".wind");
  windDisplay.textContent = "Wind Speed : " + data.wind.speed + " MPH";
  var lon = data.coord.lon;
  var lat = data.coord.lat;

  var uvSite =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;
  console.log(uvSite);
  async function getUV() {
    const response = await fetch(uvSite, {
      method: "GET",
    });

    const uvData = await response.json();
    var uvDisplay = document.querySelector(".uv");
    uvDisplay.textContent = "UV : " + uvData.value;

    // IF statement for color changes to UV
  }
  getUV();
}
async function get5Day(city, forecastSite) {
  var forecastCity = document.querySelectorAll(".list-group-item");

  var forecastSite =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey;

  const response = await fetch(forecastSite, {
    method: "GET",
  });
  const forecastData = await response.json();
  console.log(forecastData.list.length);
  var previousDay = "";
  previousDay = moment().format("MM/DD/YYYY");
  for (let i = 1; i < forecastData.list.length; i += 8) {
    var nowDay = moment(forecastData.list[i].dt, "X").format("MM/DD/YYYY");

    var forecast5DayCard = document.querySelector(".five-day-display");
    var forecastCard = document.createElement("div");
    forecastCard.className = "card col-2";
    var forecastDate = document.createElement("h2");
    forecastDate.className = "date-title-forecast";
    var forecastTemp = document.createElement("p");
    forecastTemp.className = "temp-forecast";
    var forecastIcon = document.createElement("img");
    forecastIcon.className = "img-Forecast";
    var forecastHumidity = document.createElement("p");
    forecastHumidity.className = "humidity-forecast";

    forecast5DayCard.append(forecastCard);
    forecastCard.append(forecastDate);
    forecastCard.append(forecastTemp);
    forecastCard.append(forecastIcon);
    forecastCard.append(forecastHumidity);

    forecastIcon.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" +
        forecastData.list[i].weather[0].icon +
        "@2x.png"
    );
    forecastDate.textContent = nowDay;
    var forecastImperial = Math.trunc(
      (forecastData.list[i].main.temp - 273.15) * 1.8 + 32
    );
    forecastTemp.textContent = "Temp : " + forecastImperial + "\u00B0" + "F";
    forecastHumidity.textContent =
      "Humidity : " + forecastData.list[i].main.humidity + "%";

    // forecastCity.addEventListener("click", function () {
    //   get5Day(city);
    // });
  }
}
