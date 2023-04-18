const Spinner = require('cli-spinner').Spinner;

let spin;

function spinMaster(statusMsg) {
    if (!statusMsg) return spin.stop();
    if (spin) spin.stop();
    spin = new Spinner(statusMsg + '%s')
        .setSpinnerString(15)
        .start();
};

const q = {
     bookSearch: [
        {type: 'input', name: 'author', message: 'Enter author\'s name'}, 
        {type: 'input', name: 'title', message: 'Enter book title'}
    ],
     selectBook: [
        {type: 'list', choices: [], name: 'selected', message: '\nSelect a book to save:\n'}
    ],
     anotherSearch: [
        {type: 'confirm', message: '\nWould you like to add another book to your list?', name: 'addAnother'}
    ],
     tryAgain: [
        {type: 'confirm', message: '\nNo results for that search! Start again?', name: 'startAgain'}
    ]
};

module.exports = {spinMaster, spin, q}