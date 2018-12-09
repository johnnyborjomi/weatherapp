const fs = require('fs');

const citiesText = fs.readFileSync('./src/assets/city.list.json');
const cities = JSON.parse(citiesText);

console.log(cities[1]);


let mappedCities = cities.filter((city) => {
    if (city.country == "UA") return city.name
}).map(city => city.name);

function removeDuplicates(arr) {
    return [...new Set(arr)];
}
mappedCities = removeDuplicates(mappedCities);

console.log(mappedCities[1], mappedCities.length);

fs.writeFileSync('./src/assets/mappedCityList.js', JSON.stringify(mappedCities));