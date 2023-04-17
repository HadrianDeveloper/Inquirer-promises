const inquirer = require('inquirer');
const axios = require('axios');

const pokeAPI = axios.create({baseURL: 'https://pokeapi.co/api/v2/pokemon/'});

const q = [{
    type: 'input',
    message: 'Pick a Pokemon ID',
    name: 'pokemonID'
}];

inquirer
    .prompt(q)
    .then(({pokemonID}) => {
        return pokeAPI.get(pokemonID);
    })
    .then(({data}) => console.log(`Your selected Pokemon is called ${data.name}!`))
    .catch(({code}) => {
        if (code === 'ERR_BAD_REQUEST') console.log('No Pokemon has that ID!')
    });

