import * as React from "react";
import { difference } from "lodash";

import WeatherWidget from "./weather-widget/weather-widget";
import WeatherService from "./weather-widget/weather.service";
import CitySearch from "./city-search/city-search";

const defaultCity = "New York";

//todo: @vm: get all cities from service
const fullCityList = [
  "Kharkiv",
  "Lviv",
  "Kiev",
  "London",
  "Tokyo",
  "Moscow",
  "Paris",
  "Phuket",
  "Berlin",
  "Kiel",
  "Sharm ash Shaykh",
  "Rome"
];

export class App extends React.Component {
  state = { cities: [defaultCity] };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //add current city to the list
    new WeatherService()
      .getCurrentCityName()
      .then(cityName =>
        this.setState(({ cities }) => ({ cities: [cityName, ...cities] }))
      );
  }

  handleCityChange(newCity) {
    if (this.state.cities.indexOf(newCity) >= 0) {
      console.log("city already added");
      return;
    }

    this.setState(({ cities }) => ({ cities: [...cities, newCity] }));
  }

  deleteCity(city) {
    this.setState(({ cities }) => ({ cities: difference(cities, [city]) }));
  }

  render() {
    let { cities } = this.state;

    let cityList = difference(fullCityList, cities);

    //todo: @vm: render selector and weather widget as separate components

    //todo: @vm: make weather widget as component, - it should receive city, and then
    //todo: @vm: go to service by itself and get data, and show spinner!
    //todo: @vm: also here you should have some kind of cityList where you can
    //todo: @vm: manage cities, i.e. add/remove city widgets, as in zadanie.
    //todo: @vm: so do that shit.

    return (
      <div className="screen">
        <div className="city-selector">
          <CitySearch onSearch={event => this.handleCityChange(event)} />
        </div>

        <hr />
        <div className="widgets">
          {cities.map(city => (
            <WeatherWidget
              key={city}
              city={city}
              onDeleteWidget={city => this.deleteCity(city)}
            />
          ))}
        </div>
      </div>
    );
  }
}
