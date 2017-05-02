'use strict';
const CONSTS = require('../../consts');
const colors = require('colors');
const fs = require('fs');
const _ = require('lodash');
const PrinterAdapter = require('../../services/PrinterAdapter');

class ClassParser {
	static checkLines(lineReader, filePath) {
	    return new Promise((resolve, reject) => {
            let count = 0;

            lineReader.on('error', (err) => {
                lineReader.close();
                reject(err);
            });
            lineReader.on('line', () => count++);
            lineReader.on('close', () => {
                if(count > CONSTS.CLASS_LINES_LENGTH){
                    PrinterAdapter.title('Class lines length violation');
                    PrinterAdapter.warning(
                        `Found ${count} lines in file "${filePath.bold}". Recommended is ${CONSTS.CLASS_LINES_LENGTH}.`
                    );
                }
                resolve();
            })
		});
	}

	static parse(filePathArgument) {
		return new Promise((resolve, reject) => {
            fs.readFile(filePathArgument, 'UTF-8', (err, rawFileString) => {
                if(err) {
                    reject();
                    return console.error(`File ${filePathArgument} does not exists.`);
                }

                const classRegexp = /class \w+.\{/g;
                const classMatches = rawFileString.match(classRegexp);

                checkClassDefinitionsMoreThanOne(classMatches);

                _.each(classMatches, (className) => {
                    checkCorrectClassName(className);
                });

                resolve();
            });
		});

		function checkClassDefinitionsMoreThanOne(classMatches) {
			if(classMatches && classMatches.length > 1){
				PrinterAdapter.title('Class rule violation');
				PrinterAdapter.warning(
					`Found ${classMatches.length} classes definition in file "${filePathArgument.bold}", please consider refactoring.`
				);
			}
		}

		function checkCorrectClassName(className) {
			const incorrectClassNamesRegex = /processor|Processor|Manager|manager|data|Data|info|Info/g;
			const errorMessage = `Wrong class name ` + `"${className.replace(/\s?{/g, '')}"`.bold +
				` in file "${filePathArgument.bold}". ` + 
				`You should avoid using words in class names like ` + `Processor, Manager, Data, Info.`.bold;

			if(className.match(incorrectClassNamesRegex)){
				PrinterAdapter.title(`Class name rule violation`);
				PrinterAdapter.warning(errorMessage);
			}
		}
	}
}

module.exports = ClassParser;