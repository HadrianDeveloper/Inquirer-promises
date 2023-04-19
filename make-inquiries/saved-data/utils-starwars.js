const axios = require('axios');
axios.defaults.baseURL = 'https://swapi.dev/api/'

exports.fetchData = (path) => {
    return axios.get(path);
};

function questionBuilder(choices, name, msg) {
    return [{
        type: 'list',
        choices: choices,
        name: name,
        message: msg
    }];
};

exports.prepareQuestion = (arr, keyName, name, msg) => {
    const choicesArr =  arr.map((i) => i[keyName]);
    return questionBuilder(choicesArr, name, msg);
};
