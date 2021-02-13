var apiKey = "c3de2d2c940e3b4a114f178684ecc6fd";
var city = localStorage.getItem("savedCity");
var savedCity = [];
// var cityList;
// var city = "Austin";
// query URL for one day forcast in a city
var queryUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  apiKey;

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

  }

  cityListPage();
});

// function to get weather for a specific city
async function getWeather() {
  const resp = await fetch(queryUrl, {
    method: "GET",
  });

  const data = await resp.json();

  console.log(data);

  var cityWeather = data.main.temp;
}

getWeather();
