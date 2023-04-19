const { fetchData, prepareQuestion, questionBuilder } = require("./saved-data/utils-starwars");
const inquirer = require('inquirer');

const filmMenu = ['planets', 'people', 'starships'];

fetchData('films')
    .then(({data}) => {
        const pickFilm = prepareQuestion(
            data.results, 'title', 'film', 'Pick a Starwars film'
        );
        return inquirer.prompt(pickFilm)
    })
    .then(({film}) => {
        const pickTopic = questionBuilder(
           'topic', 'Pick a topic to explore for this film', filmMenu
        );
        return inquirer.prompt(pickTopic)
    })
    .then(({topic}) => console.log(topic))
    .catch((err) => console.log(err))



