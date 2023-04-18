const axios = require('axios');
const Spinner = require('cli-spinner').Spinner;
let spin;

function spinMaster(statusMsg) {
    if (!statusMsg) return spin.stop();
    if (spin) spin.stop();
    spin = new Spinner(statusMsg + '%s')
        .setSpinnerString(15)
        .start();
};

const q = {
     bookSearch: [
        {type: 'input', name: 'author', message: 'Enter author\'s name'}, 
        {type: 'input', name: 'title', message: 'Enter book title'}
    ],
     selectBook: [
        {type: 'list', choices: [], name: 'selected', message: '\nSelect a book to save:\n'}
    ],
     anotherSearch: [
        {type: 'confirm', message: '\nWould you like to add another book to your list?', name: 'addAnother'}
    ],
     tryAgain: [
        {type: 'confirm', message: '\nNo results for that search! Start again?', name: 'startAgain'}
    ]
};

const starQ = {
    pickFilm: [{
        type: 'list', name: 'film', choices: [], message: 'Which Star Wars film do you want to learn more about?'
    }],
    pickTopic: [{
        type: 'list', name: 'topic', choices: ['starships', 'planets', 'characters'], message: 'Which area of this film would you like to learn more about?'
    }],
    pickCast: [{
        type: 'list', name: 'cast', choices: [], message: 'Select a character to learn more:'
    }],
    pickPlanet: [{
        type: 'list', name: 'planet', choices: [], message: 'Select a planet to learn more:'
    }],
    moreShip: [{
        type: 'list', name: 'ship', choices: [], message: 'Select a starship to learn more:'
    }]
};

function prebuildQuestions(arr) {
    arr.forEach((i) => {
        axios
            .get(i)
            .then(({data}) => {
                starQ.pickCast[0].choices.push(data.name);
            })
            .catch((err) => console.log(err))
    })
};

function filmOverviewer(data) {
    const {
        title, 
        episode_id, 
        opening_crawl, 
        director, 
        characters, 
        planets, 
        starships } = data[0];
    
//NEXT1 push chars, planets, ships into this function to prep for NEXT2 questions
    prebuildQuestions(characters)
    
    return `Episode ${episode_id}: ${title}.\nDirected by ${director}.\n\n${opening_crawl}`
};

module.exports = {spinMaster, spin, q, starQ, filmOverviewer}