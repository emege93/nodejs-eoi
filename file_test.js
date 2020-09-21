const { response } = require('express');
const fs = require('fs')
const fetch = require('node-fetch')

console.log('Leyenedo README sincronamente');
const readmeData = fs.readFileSync('./README.md')
console.log('README leido');
console.log(readmeData.toString());

console.log('-----------------');

console.log('Leyendo README asincronamente');

const readmeDataAsync = fs.readFile('./README.md', (err,data) => {
    if(err) throw err;

    console.log('Leido FINAL');
})

console.log('EADME leido asincronamente');

const apiResponse = fetch("https://api.thecatapi.com/v1/images/search");

apiResponse.then((response) => {
    console.log('Status COde');

    if (response.status != 200) {
        throw new Error('mi error');
    }

    return response.text();
}).then((data) => {
    const myCats = JSON.parse(data);
    console.log(myCats[0].url);

}).catch((err) => {
    response.end('hay un error')
})