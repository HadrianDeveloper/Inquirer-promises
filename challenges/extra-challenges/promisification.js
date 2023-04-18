const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "../challenges/secret-message.txt");

function readSecretFile(cb) {
  fs.readFile(filePath, 'utf8', cb);
};

// v1 - reuse above cb function to return results in a Promise
function promisifiedReadSecretFile() {
  return new Promise((res, rej) => {
    readSecretFile((err, contents) => {
      err ? rej(err) : res(contents)
    })
  })
};

// v2 - using Promise constructor to wrap the callback-based fs API
// Handy if fs/promises module was not available
function promisifiedReadSecretFile() {
  return new Promise((res, rej) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      err ? rej(err) : res(content)
    })
  })
};

module.exports = { readSecretFile, promisifiedReadSecretFile };