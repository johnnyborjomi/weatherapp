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

export function getCities(query) {
  if (query.length < 1) return Promise.resolve([]);

  //todo: impl autocomplete using external api
  //return getCityListLike(query);

  let filtredCities = cities.filter((city, i) => {
    return city.toLowerCase().substr(0, query.length) == query.toLowerCase();
  });

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(filtredCities.slice(0, 10));
    }, 1000);
  });
}
