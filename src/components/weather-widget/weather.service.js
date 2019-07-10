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
function weatherMapper({ weather, main, name: cityName }) {
  //get first weather obj from weather arr
  let [w1] = weather;

  let icon = weatherIcons[w1.icon] || "⛔️";
  let { description } = w1;
  let { temp, pressure, humidity } = main;

  return { cityName, weather, icon, description, temp, pressure, humidity };
}

function getCurrentGeoPosition() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  ).then(({ coords }) => coords);
}

//todo: @vm: no need to use class here, use just simple func instead
export default class WeatherService {
  constructor() {
    const units = "metric";
    const apiKey = "fc224f33111b95796a7a8bcfc97ddea5";
    this.apiDomain = `https://api.openweathermap.org/data/2.5/`;
    const basicParams = `?units=${units}&appid=${apiKey}`;
    this.weatherEndpoint = `${this.apiDomain}weather${basicParams}`;
  }

  getCurrentCityName() {
    return getCurrentGeoPosition().then(this.getCityNameByLatLng);
  }

  getCityNameByLatLng = coords => {
    return this.getWeatherByCoords(coords).then(({ cityName }) => cityName);
  };

  getCityNameByZip = zip => {
    return this.getWeatherByZip(zip)
      .then(({ cityName }) => cityName)
      .catch(error => {
        console.warn(error);
        return null;
      });
  };

  getWeatherByZip(zip) {
    let zipQuery = `&zip=${zip},us`;
    let apiUrl = this.weatherEndpoint + zipQuery;

    return this.getWeather(apiUrl);
  }

  getWeatherByCoords({ latitude, longitude }) {
    let coordsQuery = `&lat=${latitude}&lon=${longitude}`;
    let apiUrl = this.weatherEndpoint + coordsQuery;

    return this.getWeather(apiUrl);
  }

  getWeatherByCity(city) {
    let cityQuery = `&q=${city}`;
    let apiUrl = this.weatherEndpoint + cityQuery;

    return this.getWeather(apiUrl);
  }

  getWeather(apiUrl) {
    return (
      fetch(apiUrl)
        .then(data => data.json())
        // .then(data => (console.log(data), data))
        .then(weatherMapper)
        .catch(err => {
          console.log(err);
        })
    );
  }
}
