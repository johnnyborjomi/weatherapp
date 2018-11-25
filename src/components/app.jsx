import { throttle } from "lodash"

import * as React from "react";

import ApiGetter from './api-getter';

const test = new ApiGetter();
test.getResponse('Lviv');

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cityName: null,
            weatherData: {}
        };

        this.ApiResoponseGetter = new ApiGetter();

        this.citySelect = document.getElementById('select');
    };

    getWeather(event) {
        console.log(event.target.value);
        let cityName = event.target.value;
        this.setState({ cityName });
        this.ApiResoponseGetter.getResponse(cityName).then(weatherData => {
            this.setState({ weatherData });
        });


    }

    render() {

        let { cityName, temp, weatherData } = this.state;

        return (
            <div className="screen">
                <span>Select City</span>
                <hr />
                <select id="select" onChange={(event) => this.getWeather(event)}>
                    <option disabled>Select City</option>
                    <option value="Kharkiv">Kharkiv</option>
                    <option value="Kiev">Kiev</option>
                    <option value="Lviv">Lviv</option>
                </select>
                <div className="results">
                    <span>{cityName}</span>
                    <span>{JSON.stringify(weatherData)}</span>
                </div>
            </div>
        )
    }
}
