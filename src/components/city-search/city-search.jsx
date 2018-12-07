import * as React from "react";
import classnames from "classnames";

import { debounce, throttle } from 'lodash';
import { getCities } from './city-search.service.js';

import './city-search.scss';

//todo: @vm: impl with autocomplete
export default class CitySearch extends React.Component {

  state = {
    suggestList: [],
    showSuggest: "false"
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

  closeSuggest() {
    this.setState({ showSuggest: 'false' });
    this.setState({ suggestList: [] });
  }

  render() {

    this.state.showSuggest = this.state.suggestList.length > 0;

    return (
      <div className="city-search">
        <input type="text" className="city-search__input" onChange={(event) => this.onChange(event)} />
        <ul className={classnames(["city-search__suggestion", { "is-active": this.state.showSuggest }])}>
          {this.state.suggestList.map(city => <li key={city.toString()}>{city}</li>)}
        </ul>
        <div className={classnames(["overlay", { "is-active": this.state.showSuggest }])} onClick={this.closeSuggest.bind(this)}></div>
      </div>
    );
  }
}
