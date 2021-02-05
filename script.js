var apiKey = "c3de2d2c940e3b4a114f178684ecc6fd";
var city = localStorage.getItem("savedCity");
// var city = "Austin";
// query URL for one day forcast in a city
var queryUrl =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  apiKey;

// function to get weather for a city 
async function getWeather() {
  const resp = await fetch(queryUrl, {
    method: "GET",
  });

  const data = await resp.json();

  console.log(data);
}

// function saveCity (){
//     var queryUrl =
// }

$("#9-am .description").val(localStorage.getItem("9am"));
