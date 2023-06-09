const inquirer = require('inquirer');
const axios = require('axios');
const {writeFile, readFile} = require('fs/promises');
const { spinMaster, q } = require('./utils');

axios.defaults.baseURL = 'https://www.googleapis.com/books/v1/';
const dataFolderPath = `${__dirname}/saved-data`;

function findABook() {
  inquirer
    .prompt(q.bookSearch)
    .then(({author, title}) => {
        spinMaster('Fetching books from GoogleAPI...');
        return axios.get(`volumes?q=${title}+inauthor:${author}`)
    })
    .then(({data}) => {
        spinMaster();
        for (let x = 0; x < 5; x++) {
            const d = data.items[x].volumeInfo;
            q.selectBook[0].choices.push(JSON.stringify({
                title: d.title,
                author: d.authors,
                publishDate: d.publishedDate
            }));
        };
        return Promise.all([
            inquirer.prompt(q.selectBook), 
            readFile(`${dataFolderPath}/saved-books.json`, 'utf8')
        ])
    })
    .then(([{selected}, arr]) => {
        spinMaster('Saving to file...')
        const parsedFile = JSON.parse(arr);
            parsedFile.push(JSON.parse(selected));
            return writeFile(`${dataFolderPath}/saved-books.json`, JSON.stringify(parsedFile, null, 2)) 
    })
    .then(() => {
        spinMaster();
        console.log('\nThis book has been saved!')
        return inquirer.prompt(q.anotherSearch);   
    })
    .then(({addAnother}) => {
        if (addAnother) findABook()
    })
    .catch((err) => {
        inquirer.prompt(q.tryAgain)
            .then(({startAgain}) => {
                if (startAgain) findABook()
            });
    })
};

findABook();