const Spinner = require('cli-spinner').Spinner;

let spin;

function spinMaster(statusMsg) {
    if (!statusMsg) return spin.stop();
    if (spin) spin.stop();
    spin = new Spinner(statusMsg + '%s')
        .setSpinnerString(15)
        .start();
};

module.exports = {spinMaster, spin}