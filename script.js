var apiKey = "c3de2d2c940e3b4a114f178684ecc6fd";
var currentCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
// var city = "";
// console.log("What City:", city);
// var cityList;
// var city = "Austin";
// query URL for one day forcast in a city


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
    getTheWeather()
  }

  cityListPage();
});

// function to get weather for a specific city
function getTheWeather (city){ 
  var city = $(".city-input").val();
  var currentQuery = "";
  console.log(city); 
  getWeather(); 
  
 
  
  async function getWeather() {
    if (city !== ""){
        currentQuery = currentCityUrl + city + "&appid=" + apiKey;
        console.log(currentQuery);
    } else {
        console.log("You need an input");
    };
   
    const resp = await fetch(currentQuery, {
      method: "GET",
    });

    const data = await resp.json();

    console.log(data);

    var cityWeather = data.main.temp;
    var fahrenheit = Math.trunc((cityWeather - 273.15) * 1.8 + 32);
    console.log("Current Weather in " + city, fahrenheit);
}
// end of the function
}



