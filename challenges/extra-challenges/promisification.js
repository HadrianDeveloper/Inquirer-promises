const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, "../challenges/secret-message.txt");

function readSecretFile(cb) {
  fs.readFile(filePath, 'utf8', cb);
};

function promisifiedReadSecretFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, contents) => {
      (err) ? reject(err) : resolve(contents);
    });
  });
};

module.exports = { readSecretFile, promisifiedReadSecretFile };