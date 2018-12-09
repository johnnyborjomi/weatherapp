import * as React from "react";
import classnames from "classnames";

import { debounce, throttle } from 'lodash';
import { getCities } from './city-search.service.js';

import './city-search.scss';

const defaultCities = ["Kharkiv", "Kiev", "Lviv", "Odessa"];

//todo: @vm: impl with autocomplete
export default class CitySearch extends React.Component {

  state = {
    suggestList: defaultCities,
    showSuggest: false
  }

  debouncedDataHandler = debounce(this.dataHandler, 500);

  dataHandler(event) {
    let query = event.target.value;

    let data = getCities(query);

    console.log(data);

    this.setState({ suggestList: data })

  }

  onChange(event) {
    event.persist();
    this.debouncedDataHandler(event);
  }

  openSuggest() {
    this.setState({ showSuggest: true });
  }

  closeSuggest() {
    setTimeout(() => {
      this.setState({ showSuggest: false });
    }, 200)

  }

  render() {

    let { onSearch } = this.props;


    return (
      <div className="city-search">
        <input type="text" className="city-search__input"
          onChange={(event) => this.onChange(event)}
          onFocus={() => { this.openSuggest() }}
          onKeyPress={() => { this.openSuggest() }}
          onClick={() => { this.openSuggest() }}
          onBlur={() => this.closeSuggest()}
        />
        <ul className={classnames(["city-search__suggestion", { "is-active": this.state.showSuggest }])}>
          {this.state.suggestList.map(city => <li key={city.toString()} onClick={() => onSearch(event)}>{city}</li>)}
          {this.state.suggestList.length === 0 && <li disabled>Nothing Found...</li>}
        </ul>
        <div className={classnames(["overlay", { "is-active": this.state.showSuggest }])}></div>
      </div >
    );
  }
}
