//todo: @vm: rename it to weather.service.js, or weather.endpoint.js

//https://emojipedia.org/nature/
export const weatherIcons = {
  //day
  ["01d"]: "☀️",
  ["02d"]: "🌤️",
  ["03d"]: "🌥️",
  ["04d"]: "☁️",
  ["09d"]: "🌧️",
  ["10d"]: "🌦️",
  ["11d"]: "⛈️",
  ["13d"]: "🌨️",
  ["50d"]: "🌫️",
  //night
  ["01n"]: "🌚",
  ["02n"]: "🌤️",
  ["03n"]: "🌥️",
  ["04n"]: "☁️",
  ["09n"]: "🌧️",
  ["10n"]: "🌦️",
  ["11n"]: "⛈️",
  ["13n"]: "🌨️",
  ["50n"]: "🌫️"
};

//todo: @vm: get only needed data from api, and return only it
function weatherMapper({ weather, main }) {
  //get first weather obj from weather arr
  let [w1] = weather;

  let icon = weatherIcons[w1.icon] || "⛔️";
  let { description } = w1;
  let { temp } = main;

  return { weather, icon, description, temp };
}

//todo: @vm: no need to use class here, use just simple func instead
export default class WeatherService {
  constructor() {
    this.log = "";
    this.apiKey = "&appid=fc224f33111b95796a7a8bcfc97ddea5";
    this.apiDomain =
      "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  }

  //todo: @vm: rename: get weather by city (meaningful name)
  getWeatherByCity(city) {
    let apiUrl = this.apiDomain + city + this.apiKey;
    return fetch(apiUrl)
      .then(data => data.json())
      .then(data => (console.log(data), data))
      .then(weatherMapper)
      .catch(err => {
        console.log(err);
      });
  }
}
