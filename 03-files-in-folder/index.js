const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');
fs.readdir(folderPath, {withFileTypes: true}, (error, files) => {
    if (error) {
        console.log(error); 
    }
    else {
        files.forEach(file => {
            if (file.isFile()) {
                const extension = path.extname(file.name);
                const filePath = path.join(folderPath, file.name);
                fs.stat(filePath, (error, data) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(`${file.name} - ${extension.slice(1, extension.length)} - ${(data.size / 1024).toFixed(3)}kb`);
                    }
                })
            }
        })
    }
})