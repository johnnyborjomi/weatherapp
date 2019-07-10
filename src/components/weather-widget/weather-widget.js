import * as React from "react";
import classnames from "classnames";

import WeatherService from "./weather.service";

import "./weather-widget.scss";

const weatherService = new WeatherService();

//todo: @vm: impl weather widget
export default class WeatherWidget extends React.Component {
  state = {
    weatherData: {}
  };

  componentDidMount() {
    let { city } = this.props;
    this.getWeather(city);
  }

  componentWillReceiveProps(props) {
    let { city } = props;
    this.getWeather(city);
  }

  async getWeather(city) {
    let weatherData = await weatherService.getWeatherByCity(city);
    if (weatherData) {
      this.setState({ weatherData });
    }
  }

  render() {
    let { city, onDeleteWidget } = this.props;
    let { weatherData } = this.state;

    let {
      description = "...",
      temp = 0,
      humidity,
      pressure,
      icon = "?"
    } = weatherData;

    //todo: do it better
    let isLoading = !weatherData.icon;

    temp = Math.floor(temp);

    let tempBgc = isLoading ? "#fff" : temp > 0 ? "#fff3d0" : "#d8eeff";

    return (
      <div
        className={classnames(["weather-widget", { "is-loading": isLoading }])}
        style={{ backgroundColor: tempBgc }}
      >
        <div className="city">{city}</div>
        <div className="desc">
          {new Date().toDateString()}, {description}
          <div>
            <div>💧humidity: {humidity}</div>
            <div>🌡pressure: {pressure}</div>
          </div>
        </div>
        <div className="main">
          <div className="temp">
            <div className="temp-value">{temp}</div>
            <div className="temp-units">°C</div>
          </div>
          <div className="icon">{icon}</div>
        </div>
        <div className="button-delete" onClick={() => onDeleteWidget(city)}>
          ✖️
        </div>
      </div>
    );
  }
}
