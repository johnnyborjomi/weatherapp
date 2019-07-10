// const apiUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
// const apiKey = 'YvWUlJ9J8Si4e90YIPKEReJfn95BFTIK';

// export function getCities(query) {
//     return fetch(`${apiUrl}?apikey=${apiKey}&q=${query}`)
//         .then(res => res.json())
//         // .then(data => (console.log(data), data))
//         .then(cityMapper)
//         .catch(err => {
//             console.log(err);
//         });;
// }

import { cities } from "../../assets/united-states.city-list.js";
import WeatherService from "../weather-widget/weather.service.js";

function cityMapper(data) {
  if (!data.list) return [];

  const cityList = data.list.map(city => city.name);

  return [...new Set(cityList)].slice(0, 10);
}

function getCityListLike(queryString) {
  //todo: unify with weather.service

  const apiKey = "fc224f33111b95796a7a8bcfc97ddea5";
  const apiDomain = `https://api.openweathermap.org/data/2.5/`;

  const apiUrl = `${apiDomain}find?appid=${apiKey}&q=${queryString}&type=like&sort=population&cnt=30`;

  return fetch(apiUrl)
    .then(data => data.json())
    .then(cityMapper)
    .catch(error => {
      console.warn(error);
      return [];
    });
}

const weatherService = new WeatherService();

export async function getCities(query) {
  if (query.length < 1) return Promise.resolve([]);

  //todo: impl autocomplete using external api
  //return getCityListLike(query);

  const latLng = getLatLng(query);
  const zip = getZip(query);

  if (latLng) {
    const cityName = await weatherService.getCityNameByLatLng(latLng);
    if (cityName) {
      return [cityName];
    }
  }

  if (zip) {
    const cityName = await weatherService.getCityNameByZip(zip);
    if (cityName) {
      return [cityName];
    }
  }

  let filtredCities = cities.filter((city, i) => {
    return city.toLowerCase().substr(0, query.length) == query.toLowerCase();
  });

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(filtredCities.slice(0, 10));
    }, 1000);
  });
}

function getZip(query = "") {
  const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

  const matched = zipRegex.exec(query);

  if (!Array.isArray(matched)) return null;

  return matched;
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
