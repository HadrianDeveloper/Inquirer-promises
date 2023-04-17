const inquirer = require('inquirer');
const axios = require('axios');
const { appendFile } = require('fs/promises');

function findAPokemon() {

    const questions = [{
        type: 'list',
        choices: ['Pokemon ID', 'Pokemon name'],
        name: 'searchType',
        message: 'How would you like to search for Pokemon?'
    }, {
        type: 'input',
        name: 'term',
        message: 'Enter'
    }];

    const anotherSearch = [{
        type: 'confirm', 
        name: 'anotherSearch', 
        message: 'Would you like to search for another Pokemon?'
    }];

    inquirer
        .prompt(questions)
        .then(({searchType, term}) => {
            const base = 'https://pokeapi.co/api/v2/pokemon/';
                return axios.get(base + term)
        })
        .then(({data}) => {
            let abs = '';
                data.abilities.forEach(a => {
                    abs += `${a.ability.name}, `
                });
            let body = 
                `\nPokemon name: ${data.name}\nPokemon ID: ${data.id}\nAbilities: ${abs}\n`

            return appendFile(`${__dirname}/saved-data/my-pokemons.txt`, body, 'utf8')
        })
        .then(() => {
            console.log('File updated with new Pokemon!');
            return inquirer.prompt(anotherSearch);
        })
        .then(({anotherSearch}) => {
            if (anotherSearch) findAPokemon()
        })
        .catch((err) => {
            if (err.response.status === 404) {
                console.log('That Pokemon ID or name does not exist!');
            }
        })
};

findAPokemon()
