'use strict';
const fs = require('fs');
const colors = require('colors');
const pathArgument = process.argv[2];
const CONSTS = require('./consts');
const MethodParser = require('./parsers/method/MethodParser');
const ClassParser = require('./parsers/class/ClassParser');
const recursive = require('recursive-readdir');
const _ = require('lodash');

if( ! pathArgument) {
	return console.error('You must put file path as first argument.'.underline.yellow)
}

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
	let isCorrect = false;

	_.each(CONSTS.DEFAULT_FILE_EXTENSIONS, (extension) => {
		if(filePath.indexOf(extension) !== -1) {
			isCorrect = true;
		}
	});

	return isCorrect;
}
