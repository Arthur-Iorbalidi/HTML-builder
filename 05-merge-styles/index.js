const fs = require('fs');
const path = require('path');
const sourseFolderPath = path.join(__dirname, 'styles');
const cssFileNames = fs.readdirSync(sourseFolderPath).filter((file) => path.extname(file) === '.css');
async function CreateBundle() {
    fs.writeFileSync(path.join(__dirname, 'project-dist/bundle.css'), '');
    for (const file of cssFileNames) {
        const readStream = fs.createReadStream(path.join(sourseFolderPath, file), 'utf8');
        const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'), { flags: 'a'});
        await new Promise((resolve) => {
            readStream.on('data', (data) => {
                writeStream.write(data);
            });
            readStream.on('end', () => {
                writeStream.end();
                resolve();
            });
        });
    };
}
CreateBundle();