const path = require ('path');
const fs = require ('fs');
const pathName = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathName, 'utf-8');

stream.on('data', chunk => console.log(chunk));
stream.on('error', error => console.log('Error', error.message));