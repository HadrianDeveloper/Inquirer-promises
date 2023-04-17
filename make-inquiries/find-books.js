const axios = require('axios');
const {readFile, writeFile} = require('fs/promises');
const inquirer = require('inquirer');

axios.defaults.baseURL = 'https://www.googleapis.com/books/v1/';

function findBook() {
    const searchCriteria = [
        {type: 'input', name: 'author', message: 'Enter author\'s name'}, 
        {type: 'input', name: 'title', message: 'Enter book title'}
    ];
    const selectBookToSave = [
        {type: 'list', choices: [], name: 'selected', message: 'Select a book to save:'}
    ];

    inquirer
        .prompt(searchCriteria)
        .then(({author, title}) => {
            return axios.get(`volumes?q=${title}+inauthor:${author}`)
        })
        .then(({data}) => {
            for (let x = 0; x < 5; x++) {
                const book = data.items[x].volumeInfo;
                selectBookToSave[0].choices.push(
                    `${book.title} - ${book.authors.join('')} - ${book.publishedDate}`
                )
            };
            return Promise.all([
                inquirer.prompt(selectBookToSave), 
                readFile(`${__dirname}/saved-data/my-books.json`, 'utf8')
            ]) 
        })
        .then(([{selected}, res]) => {
            const parsedJson = JSON.parse(res);
            
            const split = selected.split(' - ');
            const objToInsert = {
                title: split[0],
                author: split[1],
                yearPublished: split[2]
            };
            parsedJson.push(objToInsert)
            return writeFile(`${__dirname}/saved-data/my-books.json`, JSON.stringify(parsedJson), 'utf8')
        })
        .then(() => {
            console.log('Book added to your list!');
            return inquirer.prompt([{
                type: 'confirm',
                message: 'Would you like to add another book to your list?',
                name: 'addAnother'
            }]);
        })
        .then(({addAnother}) => {
            if (addAnother) findBook();
        })
        .catch((err) => console.log(err));
};

findBook();