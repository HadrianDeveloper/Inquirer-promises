const axios = require('axios');

axios.defaults.baseURL = 'https://pokeapi.co/api/v2';

axios
    .get('/pokemon')
    .then(({data}) => {
        console.log(data.results)
    })
    .catch((err) => console.log(err));


