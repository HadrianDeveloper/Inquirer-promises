const inquirer = require('inquirer');
const axios = require('axios');
const { appendFile } = require('fs/promises');

function findAPokemon() {

    const searchById = [{
        type: 'input',
        name: 'id',
        message: 'How the ID of the Pokemon you are looking for:'
    }];

    const anotherSearch = [{
        type: 'confirm', 
        name: 'anotherSearch', 
        message: 'Would you like to search for another Pokemon?'
    }];

    inquirer
        .prompt(searchById)
        .then(({id}) => {
            return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        })
        .then(({data}) => {
            console.log(`You selected ${data.name}!`)
            let pokeAbilities = '';
                data.abilities.forEach(a => {
                    pokeAbilities += `${a.ability.name}, `
                });
            let body = 
                `\nPokemon name: ${data.name}\nPokemon ID: ${data.id}\nAbilities: ${pokeAbilities}\n`

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
