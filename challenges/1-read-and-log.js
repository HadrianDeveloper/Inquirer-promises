const fsp = require('fs/promises');

fsp.readFile('secret-message.txt', 'utf8')
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

