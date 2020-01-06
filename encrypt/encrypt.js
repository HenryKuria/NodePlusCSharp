const {exec} = require('child_process');
const path = require('path');

const encrypt = async (file_path, password, mimetype) => {


    return new Promise((resolve, reject) => {
        let command;
        const main_path = path.dirname(require.main.path);

        if(mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
            command = `mono ${main_path}/encrypt/encryptdocx.exe ${main_path}/${file_path} ${password}`;
        } else if(mimetype === 'application/pdf'){
            command = `mono ${main_path}/encrypt/encryptpdf.exe ${main_path}/${file_path} ${password}`;
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
            } else if (stderr) {
                reject(stderr);
            }
            resolve(`Success  Your file is located at.. '${file_path}'`)
        });
    });
};


module.exports = {
    encrypt
};