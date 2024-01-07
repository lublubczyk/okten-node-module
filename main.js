const path = require('path');
const fs = require('fs');
const params = { create: createDirWhithFile, read: readStatus, numDir: 5, numFile: 5, pathDir: __dirname };


createAndRead(params);


async function createAndRead({ create, numDir, numFile, read, pathDir }) {
    await create(numDir, numFile);
    read(pathDir);
}

function createDirWhithFile(numDir, numFile) {
    for (let i = 1; i <= numDir; i++){
        const dirPath = path.join(__dirname, `dir${i}`);
        fs.mkdir(dirPath, (error) => {
            if (error) throw new Error();
            for (let j = 1; j <= numFile; j++) {
                const filePath = path.join(dirPath, `file${i+''+j}.txt`);
                fs.writeFile(filePath, `dir ${i} file${j}`, (err) => {
                    if (err) throw new Error();
                });
            };
        });
    };
};

function readStatus(dirPath) {
    fs.readdir(dirPath, (err, value) => {
        if (err) throw new Error();
        value.forEach(val => {
            const readingPath = path.join(dirPath, val);
            fs.stat(readingPath, (statErr, stats) => {
                if (statErr) throw new Error();
                if (stats.isDirectory() && val !== '.git') {
                    console.log('DIRECTORY: ' + val);
                    readStatus(readingPath);
                } else if (stats.isFile()&& val !== 'main.js') console.log('FILE: ' + val);
            });
        });
    });
};







