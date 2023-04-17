const inquirer = require('inquirer');
const fsp = require('fs/promises');

const options = {
    type: 'list',
    message: 'Who do you wish to remove?',
    choices: null,
    name: 'toRemove'
};

fsp.readFile(`${__dirname}/vip-list.txt`, 'utf8')
    .then((contents) => {
        options.choices = contents.split('\n');
        return inquirer.prompt(options)
    })
    .then(({toRemove}) => {
        const updated = options.choices
            .filter((p) => p !== toRemove)
            .join('\n')
        return fsp.writeFile(`${__dirname}/vip-list.txt`, updated, 'utf8');
    })
    .then(() => console.log('VIP list updated'))
    .catch((err) => console.log(err));

