const inquirer = require('inquirer');
const { starQ, filmOverviewer }  = require('./utils');
const axios = require('axios');
axios.defaults.baseURL = 'https://swapi.dev/api';

axios.get('/films')
    .then(({data}) => {
        data.results.forEach((film) => {
            starQ.pickFilm[0].choices.push(film.title)
        });
        return Promise.all([
            inquirer.prompt(starQ.pickFilm), 
            data.results
        ]);
    })
    .then(([{film}, filmArr]) => {
        const selectedFilm = filmArr
            .filter((f) => f.title === film);
        console.log(filmOverviewer(selectedFilm));
        return inquirer.prompt(starQ.pickTopic)
    })
    .then(({topic}) => {
        return inquirer.prompt(starQ[topic])
    })
    .then((answer) => console.log(Object.values(answer).join()))
    .catch((err) => console.log(err));
