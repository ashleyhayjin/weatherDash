var apiKey = "c3de2d2c940e3b4a114f178684ecc6fd";
var currentCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=";


$(".submit-btn").click(function () {
  var dataCity = {
    savedCityItem: $(this).prev(".city-input").val(),
  };

  var saved = JSON.parse(localStorage.getItem("savedCity")) || [];
  saved.push(dataCity);
  localStorage.setItem("savedCity", JSON.stringify(saved));
  console.log(saved.length);
  var cityList = JSON.parse(localStorage.getItem("savedCity"));

  function cityListPage() {
    for (i = 0; i < cityList.length; i++) {
      var myDiv = $(".cityList");
      var paragraph = document.createElement("p");
      paragraph.setAttribute("class", "p" + [i]);
      paragraph.textContent = cityList[i].savedCityItem;

      // if (obj.length > 0){
    }
    myDiv.append(paragraph);
    getTheWeather();
  }

  cityListPage();
});

// function to get weather for a specific city
function getTheWeather() {
  var city = $(".city-input").val();
  var currentQuery = "";
  console.log(city);
  getWeather();

  async function getWeather() {
    if (city !== "") {
      currentQuery = currentCityUrl + city + "&appid=" + apiKey;
      console.log(currentQuery);
    } else {
      console.log("You need an input");
    }

    const resp = await fetch(currentQuery, {
      method: "GET",
    });

    const data = await resp.json();
    var iconNum = data.weather[0].icon;
    var cityWeather = data.main.temp;
    var fahrenheit = Math.trunc((cityWeather - 273.15) * 1.8 + 32);
    var currentDay = $("#currentDay");
    // var now = moment().toDate();
    // console.log(now);
    // Append to the page
    var cityDisplay = document.querySelector(".city")
    cityDisplay.textContent = city; 
    var dateDisplay = document.querySelector(".date");
    dateDisplay.textContent = moment().format("(MM-DD-YYYY)");
    var iconSite = "https://openweathermap.org/img/wn/"
    var iconLink = iconSite + iconNum + "@2x.png"
    var iconDisplay = document.querySelector(".icon").setAttribute("src", iconLink);
    var tempDisplay = document.querySelector(".temp");
    tempDisplay.textContent = "Current Temperature : " + fahrenheit + "\u00B0" + "F";
    var humidityDisplay = document.querySelector(".humidity");
    humidityDisplay.textContent = "Humidity : " + data.main.humidity + "%";
    var windDisplay = querySelector(".wind");
    windDisplay.textContent = "Wind Speed : "+ data.wind.speed + " MPH";
    // var uvDisplay = document.querySelector(".uv");
    // uvDisplay.textContent = data.

    
  }

  // end of the function
}
