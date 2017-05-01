'use strict'
const RULES = require('../rules');
const colors = require('colors');
const fs = require('fs');
const _ = require('lodash');

class ClassParser {
	static checkLines(lineReader, filePath) {
		let count = 0;

		lineReader.on('line', () => count++);
		lineReader.on('close', () => {
			if(count > RULES.CLASS_LINES_LENGTH){
				console.error('\n');
				console.error('✖ Class lines length violation'.underline.red);
				console.error(
					`  Found ${count} lines in file "${filePath.bold}". Recommended is ${RULES.CLASS_LINES_LENGTH}.`.underline.yellow
				);
			}
		})
	}

	static parse(filePathArgument) {
		fs.readFile(filePathArgument, 'UTF-8', (err, rawFileString) => {
			if(err) {
				return console.error(`File ${filePathArgument} does not exists.`);
			}
			const classRegexp = /class \w+.\{/g;
			const classMatches = rawFileString.match(classRegexp);

			checkClassDefinitionsMoreThanOne(classMatches);

			_.each(classMatches, (className) => {
				checkCorrectClassName(className);
			});
		})

		function checkClassDefinitionsMoreThanOne(classMatches) {
			if(classMatches.length > 1){
				console.error('\n');
				console.error('✖ Class rule violation'.underline.red);
				console.error(
					`  Found ${classMatches.length} classes definition in file "${filePathArgument.bold}", please consider refactoring.`.underline.yellow
				);
			}
		}

		function checkCorrectClassName(className) {
			const incorrectClassNamesRegex = /processor|Processor|Manager|manager|data|Data|info|Info/g;
			const errorMessage = `  Wrong class name ` + `"${className.replace(/\s?{/g, '')}"`.bold +
				` in file "${filePathArgument.bold}". ` + 
				`You should avoid using words in class names like ` + `Processor, Manager, Data, Info.`.bold;
			if(className.match(incorrectClassNamesRegex)){
				console.error('\n');
				console.error(`✖ Class name rule violation`.underline.red);
				console.error(errorMessage.underline.yellow);
			}
		}
	}
}

module.exports = ClassParser;