var apiKey = "c3de2d2c940e3b4a114f178684ecc6fd";
// var city = localStorage.getItem("latestcity");
var city = "Austin";
// query URL for one day forcast in a city
var queryUrl =  "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

async function getWeather (){
    const resp = await fetch(
        queryUrl,
        {
            method: "GET",
        }

    );
    
    const data = await resp.json();

    console.log(data);
}

getWeather();



// function saveCity (){
//     var queryUrl =  
// }