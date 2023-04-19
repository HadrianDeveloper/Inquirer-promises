const axios = require('axios');
axios.defaults.baseURL = 'https://swapi.dev/api/'

exports.fetchData = (path) => {
    return axios.get(path);
};

let tempStorage = [];

function giveChoices() {
    return tempStorage.map((i) => {
        return i.title
    })
}

exports.questionBuilder = (name, msg, hardOptions) => {
    return [{
        type: 'list',
        choices: hardOptions || giveChoices,
        name: name,
        message: msg
    }];
};

exports.prepareQuestion = (arr, keyName, name, msg) => {
    tempStorage =  arr.map((i) => {
        return {[keyName]: i[keyName], url: i.url}
    });
    return this.questionBuilder(name, msg);
};



/*
films 
"url": "https://swapi.dev/api/films/1/"

people
"url": "https://swapi.dev/api/people/1/"

planets
"url": "https://swapi.dev/api/planets/2/"
*/