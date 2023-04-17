const axios = require('axios');
const inquirer = require('inquirer');
const {writeFile} = require('fs/promises');

const questions = [
    {type: 'input', name: 'author', message: 'Search for an author:'},
    {type: 'input', name: 'title', message: 'Search for a book:'}
];

function searchForBook() {
    inquirer
        .prompt(questions)
        .then(({author, title}) => {
            return Promise.all([axios
                .get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`), author, title])
        })
        .then(([{data}, author, title]) => {  
            let body = `Search for books by "${author}" called "${title}" yielded ${data.totalItems} results.\n\n`

            data.items.map((book) => {
                body += (
                    `${book.volumeInfo.title}\n${book.volumeInfo.authors[0]}\n${book.volumeInfo.publishedDate}\n${book.volumeInfo.description}\n\n`
                )
            });
            return writeFile(`${__dirname}/details.txt`, body,  'utf8')
        })
        .then(() => {
            console.log('Results stored in local file');
            return inquirer.prompt([{
                type: 'confirm', 
                name: 'anotherSearch', 
                message: 'Would you like to search for another book?'}
            ]);
        })
        .then(({anotherSearch}) => {
            if (anotherSearch) searchForBook();
        })
        .catch((err) => console.log(err));
};

searchForBook();
