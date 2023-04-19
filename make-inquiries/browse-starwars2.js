const { fetchData, prepareQuestion } = require("./saved-data/utils-starwars");
const inquirer = require('inquirer');



fetchData('films')
    .then(({data}) => {
        const pickFilm = prepareQuestion(
            data.results, 'title', 'film', 'Pick a Starwars film'
        );
        return inquirer.prompt(pickFilm)
    })
    .catch((err) => console.log(err))



