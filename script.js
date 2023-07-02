const tempHtml = document.querySelector('.tem');
const windHtml = document.querySelector('.win');
const humidityHtml = document.querySelector('.hum');
const cityHtml = document.querySelector('.city-name');
const button = document.querySelector('.find-button');
const input = document.querySelector('.input-city');
const loader = document.querySelector('.loading')
const weatherImageHtml = document.querySelector('.weather-image');
const infoHtml = document.querySelector('.weather-api');
const beforeLoadingHtml = document.querySelector('.before-loading');

console.log(weatherImageHtml.attributes.src.nodeValue);


button.addEventListener('click', function(){
   const city = input.value;
   if(city === ""){
      alert('fill the input!');
      return;
   }
   cityApi(city);
   input.value = "";
   displayLoad();
})



const displayLoad = () => {
   loader.style.display = 'flex';
}

const hideLoad = () => {
   loader.style.display = 'none';
}

const displayInfo = () => {
   infoHtml.style.display = 'block';
   beforeLoadingHtml.style.display = 'none';
}

const hideInfo = () => {
   infoHtml.style.display = 'none';
   beforeLoadingHtml.style.display =' block';
}


const generateWeather = function(lat, lng, name){

   const WeatherApi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=61349924dca6249b0e2d36dc71422075`)
.then(res => res.json()).then(data => {
   displayInfo();
   hideLoad();
   console.log(data);
   const temp = ConvertToCelsius(data.main.temp);
   const wind = data.wind.speed;
   const humidity = data.main.humidity;
   const weatherstatus = data.weather[0].main;
   loadCity(name, temp, wind, humidity, weatherstatus);
   console.log(data);
})
.catch(err => {
   hideInfo();
   hideLoad();
   alert('Something went wrong. try another location!');
})
}



const cityApi = function(city){
   let options = {
      method: 'GET',
      headers: {'X-Api-Key':'BrZErqbX2FkM7Bo631Oraw==J0jFNn1jl889r1gF'},
   }
   const cityApiRes = fetch(`https://api.api-ninjas.com/v1/city?name=${city}`, options)
.then(res => res.json()).then(data => {
   console.log(data);
   const lat = data[0].latitude;
   const lng = data[0].longitude;
   const name = data[0].name;
   console.log(lat, lng);
   generateWeather(lat, lng, name);
})
.catch(err=> {
   console.error(err);
   hideInfo();
   hideLoad();
   alert('Something went wrong. try another location!');
})
}

const ConvertToCelsius = function(temp){
   return Math.round(temp - 273.15);
}

const loadCity = function(name, temp, wind, humidity, weatherstatus){
   cityHtml.textContent = name;
   tempHtml.textContent = `temp: ${temp}C`;
   windHtml.textContent = `wind: ${wind}m/s`;
   humidityHtml.textContent = `humidity: ${humidity}%`;
   weatherImageHtml.attributes.src.nodeValue = `img/${weatherstatus}.png`;
}

const weatherIcon = function(status){

}