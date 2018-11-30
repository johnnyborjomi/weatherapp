import * as React from "react";

import WeatherWidget from "./weather-widget";

//todo: @vm: get default city using geo api
const defaultCity = "Kharkiv";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: null,
      weatherData: {}
    };

    this.citySelect = document.getElementById("select");
  }

  handleCityChange(event) {
    console.log(event.target.value);
    let testCity = event.target.value;

    this.setState({ testCity });
  }

  render() {
    let { testCity } = this.state;

    //todo: @vm: get all cities from service

    let cities = [
      "Kharkiv",
      "Lviv",
      "Kiev",
      "London",
      "Tokyo",
      "Moscow",
      "Paris",
      "Phuket"
    ];

    //todo: @vm: render selector and weather widget as separate components

    //todo: @vm: make weather widget as component, - it should receive city, and then
    //todo: @vm: go to service by itself and get data, and show spinner!
    //todo: @vm: also here you should have some kind of cityList where you can
    //todo: @vm: manage cities, i.e. add/remove city widgets, as in zadanie.
    //todo: @vm: so do that shit.

    return (
      <div className="screen">
        <span>Select City</span>
        <hr />
        <select id="select" onChange={event => this.handleCityChange(event)}>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <div className="widgets">
          <WeatherWidget city={defaultCity} />
          <WeatherWidget city={"Lviv"} />
          <WeatherWidget city={testCity} />
        </div>
      </div>
    );
  }
}
