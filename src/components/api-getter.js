//todo: @vm: rename it to weather.service.js, or weather.endpoint.js
class ApiGetter {
  constructor() {
    this.log = "";
    this.apiKey = "&appid=fc224f33111b95796a7a8bcfc97ddea5";
    this.apiDomain = "https://api.openweathermap.org/data/2.5/weather?q=";
  }

  //todo: @vm: rename: get weather by city (meaningful name)
  getResponse(city) {
    let apiUrl = this.apiDomain + city + this.apiKey;
    return fetch(apiUrl)
      .then(data => data.json())
      .catch(err => {
        console.log(err);
      });
  }
}

export default ApiGetter;
