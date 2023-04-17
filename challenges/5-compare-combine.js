const fsp = require('fs/promises');

const file1  = fsp.readFile(`${__dirname}/secret-message.txt`, 'utf8')
const file2 = fsp.readFile(`${__dirname}/super-secret-message.txt`, 'utf8')

Promise.all([file1, file2])
    .then((values) => {
        const doc1 = values[0].length;
        const doc2 = values[1].length;
        const diff = doc1 > doc2 ? doc1 - doc2 : doc2 - doc1;
        console.log(
             `${doc1 > doc2 ? 'Secret Msg' : 'Super Secret Msg'} is the largest file by ${diff} characters`
        );
        return fsp.writeFile(`${__dirname}/mega-secret-message.txt`, (values[0] + ' ' + values[1]), 'utf8')
    })
    .then(() => console.log('File created!'))
    .catch((err) => console.log(err));