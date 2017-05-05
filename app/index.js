'use strict';
const fs = require('fs');
const colors = require('colors');
const pathArgument = process.argv[2];
const configPathArgument = process.argv[3];
const CONSTS = require('./consts');
const MethodParser = require('./parsers/method/MethodParser');
const ClassParser = require('./parsers/class/ClassParser');
const recursive = require('recursive-readdir');
const _ = require('lodash');
let CONFIG = null;

if( ! pathArgument) {
    return console.error('You must put file path as first argument.')
}

readConfigFileAndParseToJson(configPathArgument)
    .then((json) => CONFIG = json)
    .then(startJourney)
    .catch(startJourney);

function readConfigFileAndParseToJson(filePath) {
    return new Promise(promisified);

    function promisified(resolve, reject) {
        fs.readFile(filePath, 'UTF-8', (err, data) => {
            if(err){
                return reject(err);
            }

            return resolve(JSON.parse(data));
        });
    }
}

function startJourney() {
    fs.lstat(pathArgument, (err, result) => {
        if(err) {
            return console.error('It is not file or directory');
        }

        if(result.isDirectory()) {
            parseRecursiveFolder();
        } else if (result.isFile()) {
            parseFile(pathArgument);
        }
    });
}

function parseFile(pathArgument){
	const lineReader = require('readline').createInterface({
		input: require('fs').createReadStream(pathArgument)
	});
	const promiseList = [
	    ClassParser.assertLinesLength(lineReader, pathArgument),
        MethodParser.parse(lineReader, pathArgument),
        ClassParser.parse(lineReader, pathArgument)
    ];

    return Promise.all(promiseList);
}

function parseRecursiveFolder() {
	recursive(pathArgument, (err, files) => {
		if(err){
			return console.error('Cannot read given path as directory');
		}

		const promiseList = _.map(files, processFile);
		Promise.all(promiseList).then(finishProcessing);
	});
}

function processFile(filePath) {
    if(hasFilePathCorrectExtension(filePath)){
        return parseFile(filePath);
    } else {
        return Promise.resolve();
        // console.log('skipping> ', filePath);
    }
}

function hasFilePathCorrectExtension(filePath) {
    const extensions = _.get(CONFIG, 'include', CONSTS.DEFAULT_FILE_INCLUDED_EXTENSIONS);
    let isCorrect = false;

    _.each(extensions, (extension) => {
        if(filePath.indexOf(extension) !== -1 && ! isExcludedFileExtension(filePath)) {
            isCorrect = true;
        }
    });

    return isCorrect;
}

function isExcludedFileExtension(filePath) {
    const excludedExtensions = _.get(CONFIG, 'exclude', CONSTS.DEFAULT_FILE_EXCLUDED_EXTENSIONS);
    let isExcluded = false;

    _.each(excludedExtensions, (extension) => {
        if(filePath.indexOf(extension) !== -1) {
            isExcluded = true;
        }
    });

    return isExcluded;
}

function finishProcessing() {
    console.log('FINIIIIIIIIISH'.green);
}
