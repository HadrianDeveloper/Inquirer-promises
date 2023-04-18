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

// --- STARWARS helper functions and data for ---

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
        type: 'list', name: 'topic', choices: ['starships', 'planets', 'people'], message: '\nWhich area of this film would you like to learn more about?'
    }],
    people: [{
        type: 'list', name: 'cast', choices: [], message: '\nSelect a character to learn more:'
    }],
    planets: [{
        type: 'list', name: 'planet', choices: [], message: '\nSelect a planet to learn more:'
    }],
    starships: [{
        type: 'list', name: 'ship', choices: [], message: '\nSelect a starship to learn more:'
    }]
};

function endpointFinder(url) {
    return url.split('/')[4];
};

function prebuildQuestions(arr) {
    const topic = endpointFinder(arr[0]);
    arr.forEach((i) => {
        axios
            .get(i)
            .then(({data}) => {
                starQ[topic][0].choices.push(data.name);
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

    [characters, planets, starships]
        .forEach((topicArr) => prebuildQuestions(topicArr));
    
    return `Episode ${episode_id}: ${title}.\nDirected by ${director}.\n\n${opening_crawl}`
};

module.exports = {spinMaster, spin, q, starQ, filmOverviewer}