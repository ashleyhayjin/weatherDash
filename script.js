var apiKey = "c3de2d2c940e3b4a114f178684ecc6fd";
var city = localStorage.getItem("savedCity");
var savedCity = [];
var cityList;
// var city = "Austin";
// query URL for one day forcast in a city
var queryUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  apiKey;

$(".submit-btn").click(function(){
  

  cityList = $(".city-input").val();
  savedCity.push(cityList); 

  console.log(savedCity);

  localStorage.setItem('savedCity', JSON.stringify(savedCity));

  $("#cityList").append()

  });

// function to get weather for a specific city 
async function getWeather() {
  const resp = await fetch(queryUrl, {
    method: "GET",
  });

  const data = await resp.json();

  console.log(data);
  

  var cityWeather = data.main.temp;
};


getWeather();


