const inquirer = require('inquirer');
const { readFile, writeFile } = require('fs/promises');

readFile(`${__dirname}/vip-list.txt`, 'utf8')
    .then((text) => {
        const options = {
            type: 'list',
            name: 'toDelete',
            choices: text.split('\n'),
            message: 'Pick person to delete:'
        };
        return Promise.all([inquirer.prompt(options), options.choices])
    })
    .then(([{toDelete}, list]) => {
        const updated = list
            .filter((p) => p !== toDelete)
            .join('\n')
        return Promise.all([ 
            toDelete,
            writeFile((`${__dirname}/vip-list.txt`), updated, 'utf8')
        ]) 
    })
    .then(([name]) => console.log(`${name} has been removed!`))
    .catch((err) => console.group(err));
