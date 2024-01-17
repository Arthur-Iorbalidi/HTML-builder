const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf8');
let result = '';
readStream.on('data', (data) => {
    result += data;
});
readStream.on('end', () => {
    console.log(result);
});