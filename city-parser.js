const fs = require('fs');

// const citiesText = fs.readFileSync('./src/assets/city.list.json');
const citiesText = fs.readFileSync('./src/assets/usaCities.js');
const cities = JSON.parse(citiesText);

console.log(cities[1]);


// let mappedCities = cities.filter((city) => {
//     if (city.country == "UA") return city.name
// }).map(city => city.name);


let mappedCities = cities.map(city => city.city);


function removeDuplicates(arr) {
    return [...new Set(arr)];
}
mappedCities = removeDuplicates(mappedCities);

console.log(mappedCities[1], mappedCities.length);

fs.writeFileSync('./src/assets/mappedCityList_us.js', JSON.stringify(mappedCities));