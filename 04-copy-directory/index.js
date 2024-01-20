function copyDir() {
    const fs  = require('fs');
    const path = require('path');
    const copyFolderPath = path.join(__dirname, 'files-copy');
    const sourseFolderPath = path.join(__dirname, 'files');
    fs.mkdir(copyFolderPath, { recursive: true }, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            fs.readdir(sourseFolderPath, (error, files) => {
                if (error) {
                    console.log(error);
                }
                else {
                    files.forEach((file) => {
                        fs.copyFile(path.join(sourseFolderPath, file), path.join(copyFolderPath, file), (error) => {
                            if (error) {
                                console.log(error);
                            }
                        });
                    });
                }
            });
        }
    });
}
copyDir();