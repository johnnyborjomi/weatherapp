// const apiUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
// const apiKey = 'YvWUlJ9J8Si4e90YIPKEReJfn95BFTIK';

// function cityMapper(data) {
//     return data.map(city => city.LocalizedName);
// }

// export function getCities(query) {
//     return fetch(`${apiUrl}?apikey=${apiKey}&q=${query}`)
//         .then(res => res.json())
//         // .then(data => (console.log(data), data))
//         .then(cityMapper)
//         .catch(err => {
//             console.log(err);
//         });;
// }

import { cities } from '../../assets/mappedCityList';

export function getCities(query) {
    if (query.length < 1) return Promise.resolve([]);
    let filtredCities = cities.filter((city, i) => {
        return city.toLowerCase().substr(0, query.length) == query.toLowerCase();
    })

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(filtredCities.slice(0, 10));
        }, 1000);
    });
}