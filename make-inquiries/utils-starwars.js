const axios = require('axios');
axios.defaults.baseURL = 'https://swapi.dev/api/'

exports.fetchData = (path) => {
    return axios.get(path);
};

exports.fetchEachData = () => {}

exports.questionBuilder = (obj, keyName, q) => {
    const filmMenu = ['planets', 'characters', 'starships'];
    return [{
        type: 'list',
        choices: obj ? Object.keys(obj) : filmMenu,
        name: keyName,
        message: q
    }];
};

function getPath(url) {
    return url.slice(22)
};

exports.createTempUrlStorage = (arr, keyName) => {
    const obj = {}
    arr.forEach((i) => {
        obj[i[keyName]] = getPath(i.url) 
    });
    return obj;
};
