const inquirer = require('inquirer');
const axios = require('axios');
const {writeFile, readFile} = require('fs/promises');
const Spinner = require('cli-spinner').Spinner;

axios.defaults.baseURL = 'https://www.googleapis.com/books/v1/';
const dataFolderPath = `${__dirname}/saved-data`;

let spin;
const spinMaster = (statusMsg) => {
    if (!statusMsg) return spin.stop();
    if (spin) spin.stop();
    spin = new Spinner(statusMsg + '%s')
        .setSpinnerString(15)
        .start();
};

function findABook() {
    const searchQs = [
        {type: 'input', name: 'author', message: 'Enter author\'s name'}, 
        {type: 'input', name: 'title', message: 'Enter book title'}
    ];
    const selectBookQs = [
        {type: 'list', choices: [], name: 'selected', message: '\nSelect a book to save:\n'}
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
            console.log('This book has been saved!')
        })
        .catch((err) => console.log(err))
};

findABook();