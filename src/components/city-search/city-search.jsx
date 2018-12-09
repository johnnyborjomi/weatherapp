import * as React from "react";
import classnames from "classnames";

import { debounce, throttle } from 'lodash';
import { getCities } from './city-search.service.js';
import LoaderLinear from '../loader-linear/loader-linear.jsx';

import './city-search.scss';



const defaultCities = ["Kharkiv", "Kiev", "Lviv", "Odessa"];

//todo: @vm: impl with autocomplete
export default class CitySearch extends React.Component {

  state = {
    suggestList: defaultCities,
    showSuggest: false,
    inputValue: '',
    isLoading: false
  }

  debouncedDataHandler = debounce(this.dataHandler, 500);

  dataHandler(event) {
    let query = event.target.value;
    this.setState({ isLoading: true })
    getCities(query).then(data => this.setState({ suggestList: data, isLoading: false }));
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

    }, 200)
  }

  checkInputValue(event) {
    this.setState({ inputValue: event.target.value });
  }

  renderSuggestions(suggest) {
    return suggest.map(city => <li key={city.toString()} onClick={() => this.props.onSearch(event)}>{city}</li>)
  }

  render() {

    let { onSearch } = this.props;
    let { suggestList, inputValue, isLoading, showSuggest } = this.state;
    let isNothingFound = suggestList.length === 0 && inputValue.length > 0 && !isLoading;
    let isEmptySearch = suggestList.length === 0 && inputValue.length === 0;

    return (
      <div className="city-search">
        <input type="text" placeholder="Select city" className="city-search__input"
          onChange={(event) => this.onChange(event)}
          onFocus={(event) => { this.openSuggest(event) }}
          onKeyPress={(event) => { this.openSuggest(event) }}
          onClick={(event) => { this.openSuggest(event) }}
          onBlur={(event) => this.closeSuggest(event)}
        />
        <ul className={classnames(["city-search__suggestion", { "is-active": showSuggest, "is-loading": isLoading }])}>
          {!isNothingFound && this.renderSuggestions(suggestList)}
          {isEmptySearch && this.renderSuggestions(defaultCities)}
          {isNothingFound && < li disabled>Nothing Found.</li>}
          <LoaderLinear
            isLoading={this.state.isLoading}
          />
        </ul>
        <div className={classnames(["overlay", { "is-active": showSuggest }])}></div>
      </div >
    );
  }
}
