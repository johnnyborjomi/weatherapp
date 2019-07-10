import * as React from "react";
import classnames from "classnames";

import { debounce } from "lodash";
import { getCities } from "./city-search.service.js";
import LoaderLinear from "../loader-linear/loader-linear.jsx";

import "./city-search.scss";
import WeatherService from "../weather-widget/weather.service.js";

const defaultCities = ["New York", "Tokyo", "Toronto", "Kharkiv"];

//todo: @vm: impl with autocomplete
export default class CitySearch extends React.Component {
  state = {
    suggestList: defaultCities,
    showSuggest: false,
    inputValue: "",
    isLoading: false
  };

  debouncedDataHandler = debounce(this.dataHandler, 500);

  weatherService = new WeatherService();

  dataHandler(event) {
    let query = event.target.value;
    this.setState({ isLoading: true });
    getCities(query).then(data =>
      this.setState({ suggestList: data, isLoading: false })
    );
  }

  onChange(event) {
    event.persist();
    this.debouncedDataHandler(event);
    this.checkInputValue(event);
  }

  openSuggest(event) {
    this.setState({ showSuggest: true });
    this.checkInputValue(event);
  }

  closeSuggest(event) {
    event.persist();
    setTimeout(() => {
      this.setState({ showSuggest: false });
      this.checkInputValue(event);
    }, 200);
  }

  checkInputValue(event) {
    this.setState({ inputValue: event.target.value });
  }

  renderSuggestions(suggest) {
    return suggest.map(city => (
      <li key={city} onClick={() => this.props.onSearch(city)}>
        {city}
      </li>
    ));
  }

  renderLatLngSuggestion(latLng) {
    const hadler = () => {
      this.weatherService.getCityNameByLatLng(latLng).then(cityName => {
        this.props.onSearch(cityName);
      });
    };

    return (
      <li onClick={hadler}>
        🌐 coordinates: {latLng.latitude},{latLng.longitude}
      </li>
    );
  }

  render() {
    const { suggestList, inputValue, isLoading, showSuggest } = this.state;

    const isNothingFound =
      suggestList.length === 0 && inputValue.length > 0 && !isLoading;

    const isEmptySearch = suggestList.length === 0 && inputValue.length === 0;

    const latLng = getLatLng(inputValue);

    return (
      <div className="city-search">
        <input
          type="text"
          placeholder="input city / lat,lng"
          className="city-search__input"
          onChange={event => this.onChange(event)}
          onFocus={event => {
            this.openSuggest(event);
          }}
          onKeyPress={event => {
            this.openSuggest(event);
          }}
          onClick={event => {
            this.openSuggest(event);
          }}
          onBlur={event => this.closeSuggest(event)}
        />
        <ul
          className={classnames([
            "city-search__suggestion",
            { "is-active": showSuggest, "is-loading": isLoading }
          ])}
        >
          {!isNothingFound && this.renderSuggestions(suggestList)}
          {isEmptySearch && this.renderSuggestions(defaultCities)}
          {isNothingFound && !latLng && <li disabled>Nothing Found.</li>}
          {latLng && this.renderLatLngSuggestion(latLng)}

          <LoaderLinear isLoading={this.state.isLoading} />
        </ul>
        <div
          className={classnames(["overlay", { "is-active": showSuggest }])}
        />
      </div>
    );
  }
}

function getLatLng(query = "") {
  // regex from here:
  // https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
  const latLngRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

  const matched = latLngRegex.exec(query);

  if (!Array.isArray(matched)) return null;

  // indicies depend on regex
  const latitude = matched[1];
  const longitude = matched[4];

  return { latitude, longitude };
}
