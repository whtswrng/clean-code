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
    return console.error('You must put file path as first argument.'.underline.yellow)
}

readConfigFileAndParseToJson(configPathArgument)
    .then((json) => CONFIG = json)
    .then(initAll)
    .catch(initAll);

function initAll() {
    fs.lstat(pathArgument, (err, result) => {
        if(err) {
            return console.error('It is not file or directory');
        }

        if(result.isDirectory()) {
            initAsRecursive();
        } else if (result.isFile()) {
            initAsFile(pathArgument);
        }
    });
}


function initAsFile(pathArgument){
	const lineReader = require('readline').createInterface({
		input: require('fs').createReadStream(pathArgument)
	});

	ClassParser.checkLines(lineReader, pathArgument);
	MethodParser.parse(lineReader, pathArgument);
	ClassParser.parse(pathArgument);
}

function initAsRecursive() {
	recursive(pathArgument, (err, files) => {
		if(err){
			return console.error('Cannot read given path as directory');
		}

		_.each(files, (filePath) => {
			if(hasFilePathCorrectExtension(filePath)){
				initAsFile(filePath);
			} else {
				console.log('skipping> ', filePath);
			}
		});
	});
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
