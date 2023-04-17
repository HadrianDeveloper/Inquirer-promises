const inquirer = require('inquirer');

const q = [{
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    validate: function(input) {
        return input.length ? true : 'Please enter a value'
    }
}];

inquirer
    .prompt(q)
    .then((answer) => console.log(`Greetings ${answer.name}!`))
    .catch((err) => console.log(err));