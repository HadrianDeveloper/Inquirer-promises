const fs = require("fs/promises");
const Spinner = require("cli-spinner").Spinner;

let spinner;
const spinMaster = (statusText) => {
    if (!statusText) return spinner.stop();
    if (spinner) spinner.stop();
    spinner = new Spinner(statusText)
        .setSpinnerString(15)
        .start();
};

spinMaster('Reading files... %s');

Promise.all([
    fs.readFile("secret-message.txt"),
    fs.readFile("super-secret-message.txt")])
    .then((values) => {
        setTimeout(() => {
            const doc1 = values[0].length;
            const doc2 = values[1].length;
            const diff = (doc1 > doc2) ? doc1 - doc2 : doc2 - doc1;
            console.log(
                `\n${doc1 > doc2 ? 'Secret Msg' : 'Super Secret Msg'} is the largest file by ${diff} characters`
            );
            spinMaster('Writing file... %s');
            fs.writeFile(`${__dirname}/mega-secret-message.txt`, (values[0] + ' ' + values[1]), 'utf8');
        }, 1000);
    })
    .then(() => {
        setTimeout(() => {
            console.log("\nSuccess! mega-secret-message file created!");
            spinMaster();
        }, 3000)
    })
    .catch((err) => console.log(err));








  // works for single status message (readiong files)
//   const fs = require("fs/promises");
// const Spinner = require("cli-spinner").Spinner;
// const spinner = new Spinner(`Reading files.. %s`);
//     spinner.setSpinnerString(15);
//     spinner.start();

// Promise.all([
//   fs.readFile("secret-message.txt"),
//   fs.readFile("super-secret-message.txt"),
// ])
//   .then((values) => {

//     const doc1 = values[0].length;
//     const doc2 = values[1].length;
//     const diff = (doc1 > doc2) ? doc1 - doc2 : doc2 - doc1;
//     console.log(
//         `\n${doc1 > doc2 ? 'Secret Msg' : 'Super Secret Msg'} is the largest file by ${diff} characters`
//     );

//     fs.writeFile(`${__dirname}/mega-secret-message.txt`, (values[0] + ' ' + values[1]), 'utf8');
// })
//   .then(() => {
//     setTimeout(() => {
//       console.log("\nSuccess! mega-secret-message file created!");
//       spinner.stop();
//     }, 1000)
//   })
//   .catch((err) => console.log(err))