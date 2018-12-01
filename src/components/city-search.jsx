import * as React from "react";
import { cityList } from "../assets/mappedCityList";
import debounce from 'lodash-es/debounce'
import throttle from 'lodash-es/throttle'

//todo: @vm: impl with autocomplete
export default class CitySearch extends React.Component {

onInputKeyPress () {
  
}

  render() {
    return (
      <div>
        <input className="city-search" />
        <div className="suggestion" />
      </div>
    );
  }
}
