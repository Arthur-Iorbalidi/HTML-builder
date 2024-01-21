const fs = require('fs');
const path = require('path');
const sourseFolderPath = path.join(__dirname, 'styles');
async function getCssFiles() {
    return new Promise((resolve, reject) => {
        fs.readdir(sourseFolderPath, (error, files) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(files.filter((file) => path.extname(file) === '.css'))
            }
        });
    });
}
async function CreateBundle(cssFileNames) {
    await new Promise((resolve) => {
        fs.writeFile(path.join(__dirname, 'project-dist/bundle.css'), '', (error) => {
            if (error) {
                console.log(error);
            }
            else {
                resolve();
            }
        });
    });
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
async function MergeStyles() {
    const cssFileNames = await getCssFiles();
    CreateBundle(cssFileNames);
}
MergeStyles();