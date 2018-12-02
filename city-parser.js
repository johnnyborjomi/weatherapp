const fs = require('fs');

const citiesText = fs.readFileSync('./src/assets/city.list.json');
const cities = JSON.parse(citiesText);

console.log(cities[1]);


const mappedCities = cities.map((city) => { return city.name }).filter((city => city.length > 0 ));

console.log(mappedCities[1], mappedCities.length);

fs.writeFileSync('./src/assets/mappedCityList.js', JSON.stringify(mappedCities));