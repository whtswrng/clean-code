import {config} from "../config";
const fs = require('fs');
const pathArgument = process.argv[2];

const CONFIG_FILE_PATH = 'cleancode.config.json';

startJourney();

function startJourney() {
    fs.lstat(pathArgument, (err, result) => {
        if(err) {
            throw new Error('It is not file or directory');
        }

        if(result.isDirectory()) {
            console.log('it is a directory!');
            // parseRecursiveFolder();
        } else if (result.isFile()) {
            console.log('it is a file!');
            // parseFile(pathArgument);
        }
    });
}

// function parseFile(pathArgument){
//     const lineReader = require('readline').createInterface({
//         input: fs.createReadStream(pathArgument)
//     });
//     const promiseList = [
//         ClassParser.assertLinesLength(lineReader, pathArgument),
//         MethodParser.parse(lineReader, pathArgument),
//         ClassParser.parse(pathArgument)
//     ];
//
//     return Promise.all(promiseList);
// }
//
// function parseRecursiveFolder() {
//     recursive(pathArgument, (err, files) => {
//         if(err){
//             return console.error('Cannot read given path as directory');
//         }
//
//         const promiseList = _.map(files, processFile);
//         Promise.all(promiseList).then(finishProcessing);
//     });
// }
