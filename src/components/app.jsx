import { throttle } from "lodash";

import * as React from "react";

import WeatherService from "./weather.service";

const test = new WeatherService();
//todo: @vm: get default city using geo api
test.getResponse("Lviv");

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: null,
      weatherData: {}
    };

    this.ApiResoponseGetter = new WeatherService();

    this.citySelect = document.getElementById("select");
  }

  async getWeather(event) {
    console.log(event.target.value);
    let cityName = event.target.value;
    this.setState({ cityName });
    let weatherData = await this.ApiResoponseGetter.getResponse(cityName);

    this.setState({ weatherData });
  }

  render() {
    let { cityName, temp, weatherData } = this.state;

    //todo: @vm: get all cities from service

    //todo: @vm: render selector and weather widget as separate components

    //todo: @vm: make weather widget component, - it should receive city, and then
    //todo: @vm: go to service by itself and get data, and show spinner!
    //todo: @vm: also here you should have some kind of cityList where you can
    //todo: @vm: manage cities, i.e. add/remove city widgets, as in zadanie.
    //todo: @vm: so do that shit.

    return (
      <div className="screen">
        <span>Select City</span>
        <hr />
        <select id="select" onChange={event => this.getWeather(event)}>
          <option disabled>Select City</option>
          <option value="Kharkiv">Kharkiv</option>
          <option value="Kiev">Kiev</option>
          <option value="Lviv">Lviv</option>
        </select>
        <div className="results">
          <span style={{ fontSize: "5em" }}>
            <div>
              {cityName} t: {weatherData.temp}°
            </div>

            <div>
              {weatherData.icon}
              {weatherData.description}
            </div>
          </span>
          <br />
          <span>{JSON.stringify(weatherData)}</span>
        </div>
      </div>
    );
  }
}
