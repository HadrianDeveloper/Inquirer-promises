const inquirer = require('inquirer');
const axios = require('axios');
const {writeFile, readFile} = require('fs/promises');
const { spinMaster } = require('./utils');

axios.defaults.baseURL = 'https://www.googleapis.com/books/v1/';
const dataFolderPath = `${__dirname}/saved-data`;

function findABook() {

    const searchQs = [
        {type: 'input', name: 'author', message: 'Enter author\'s name'}, 
        {type: 'input', name: 'title', message: 'Enter book title'}
    ];
    const selectBookQs = [
        {type: 'list', choices: [], name: 'selected', message: '\nSelect a book to save:\n'}
    ];
    const repeatQ = [
        {type: 'confirm', message: '\nWould you like to add another book to your list?', name: 'addAnother'}
    ];
    const errorQ = [
        {type: 'confirm', message: '\nNo results for that search! Start again?', name: 'startAgain'}
    ];

    inquirer
    .prompt(searchQs)
    .then(({author, title}) => {
        spinMaster('Fetching books from GoogleAPI...');
        return axios.get(`volumes?q=${title}+inauthor:${author}`)
    })
    .then(({data}) => {
        spinMaster();
        for (let x = 0; x < 5; x++) {
            const d = data.items[x].volumeInfo;
            selectBookQs[0].choices.push(JSON.stringify({
                title: d.title,
                author: d.authors,
                publishDate: d.publishedDate
            }));
        };
        return Promise.all([
            inquirer.prompt(selectBookQs), 
            readFile(`${dataFolderPath}/saved-books.json`, 'utf8')
        ])
    })
    .then(([{selected}, arr]) => {
        spinMaster('Saving to file...')
        const parsedFile = JSON.parse(arr);
            parsedFile.push(JSON.parse(selected));
        return writeFile(`${dataFolderPath}/saved-books.json`, JSON.stringify(parsedFile))
    })
    .then(() => {
        spinMaster();
        console.log('\nThis book has been saved!')
        return inquirer.prompt(repeatQ);   
    })
    .then(({addAnother}) => {
        if (addAnother) findABook()
    })
    .catch((err) => {
        console.log(err);
<<<<<<< HEAD
        inquirer.prompt(errorQ)
            .then(({startAgain}) => {
                if (startAgain) findABook()
            })
=======
        return inquirer.prompt(errorQ)
    })
    .then(({startAgain}) => {
        if (startAgain) findABook()
>>>>>>> main
    })
};

findABook();