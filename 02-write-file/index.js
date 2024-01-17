const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '02-write-file.txt');
const rl = require('readline');
const interface = rl.createInterface(process.stdin, process.stdout);
const writeStream = fs.createWriteStream(filePath);
console.log('Привет! Можете вводить текст. Для выхода нажмите Ctrl + C или введите exit');
interface.on('line', (text) => {
    if (text === 'exit') {
        interface.close();
    }
    else {
        writeStream.write(text);
    }
});
interface.on('close', () => {
    console.log('Запись данных завершена');
    writeStream.end();
});