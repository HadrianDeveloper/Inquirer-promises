const { fetchData, questionBuilder, createTempUrlStorage, fetchEachData } = require("./utils-starwars");
const inquirer = require('inquirer');

let currentLinks = {};
let currentFilm = '';
let currentTopic = '';
let currentTopicLinks = {};

fetchData('films')
    .then(({data}) => {
        currentLinks = createTempUrlStorage(data.results, 'title');
        const q = '\nPick a Starwars film to explore';
        return inquirer.prompt(questionBuilder(currentLinks, 'title', q))
    })
    .then(({title}) => {
        currentFilm = title;
        const q = '\nWhich area of this film do you want to explore?';
        return inquirer.prompt(questionBuilder(null, 'topic', q))
    })
    .then(({topic}) => {
        currentTopic = topic;
        return fetchData(`${currentLinks[currentFilm]}`)
    })
    .then(({data}) => {
        console.log(Data)
    })
    .catch((err) => console.log(err))
