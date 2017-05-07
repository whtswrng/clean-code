'use strict';
const CONSTS = require('../../consts');
const colors = require('colors');
const fs = require('fs');
const _ = require('lodash');
const PrinterAdapter = require('../../services/PrinterAdapter');
const ClassCounter = require('../../services/ClassCounter').Counter;
const CLASS_CONSTS = require('../../services/ClassCounter').CONSTS;

class ClassParser {

	static assertLinesLength(lineReader, filePath) {
        let count = 0;

	    return new Promise((resolve, reject) => {
            lineReader.on('error', reject);
            lineReader.on('line', () => count++);
            lineReader.on('close', finish);

            function finish() {
                finishCountingLinesLength();
                resolve();
            }
		});

        function finishCountingLinesLength() {
            if(count > CONSTS.CLASS_LINES_LENGTH){
                ClassCounter.increase(CLASS_CONSTS.CLASS_LINE_LENGTH, 1);
                PrinterAdapter.title('Class lines length violation');
                PrinterAdapter.warning(
                    `Found ${count} lines in file "${filePath.bold}". Recommended is ${CONSTS.CLASS_LINES_LENGTH}.`
                );
            }
        }
	}

	static parse(filePathArgument) {
		return new Promise((resolve, reject) => {
            fs.readFile(filePathArgument, 'UTF-8', parseFile);

            function parseFile(err, rawFileString) {
                if(err) {
                    reject();
                    return console.error(`File ${filePathArgument} does not exists.`);
                }

                const classRegexp = /class \w+.\{/g;
                const classMatches = rawFileString.match(classRegexp);

                if(classMatches && classMatches.length) {
                    ClassCounter.increase(CLASS_CONSTS.CLASS, classMatches.length);
                }

                checkClassDefinitionsMoreThanOne(classMatches);

                _.each(classMatches, checkCorrectClassName);

                resolve();
            }
        });

		function checkClassDefinitionsMoreThanOne(classMatches) {
			if(classMatches && classMatches.length > 1){
                ClassCounter.increase(CLASS_CONSTS.CLASS_DEFINITION_MORE_THAN_ONE, classMatches.length);
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
                ClassCounter.increase(CLASS_CONSTS.CLASS_NAME_RULE, 1);
				PrinterAdapter.title(`Class name rule violation`);
				PrinterAdapter.warning(errorMessage);
			}
		}
	}
}

module.exports = ClassParser;