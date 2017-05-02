'use strict';
const CONSTS = require('../../consts');
const _ = require('lodash');
const PrinterAdapter = require('../../services/PrinterAdapter');

class MethodParser {

	static parse(lineReader, filePath) {
		parseMethods(lineReader);

		function parseMethods(lineReader){
			const methodNameRegex = /((?!if|for|while|switch|function\b)\b\w+)\s?(\([a-zA-Z0-9,\s]*\))\s?\{/g;
			let methodLineCount = 0;
			let methodName = '';
			let methodArguments = [];
			let methodCount = 0;
			let callbackNesting = 0;
			let isInCallback = false;
			let isInMethod = false;
			let bracketCounter = 0;
			let callbackNestingLines = [];

			lineReader.on('line', parseLine);

			lineReader.on('close', () => checkMethodCount(methodCount));

			function parseLine(line) {
				const methodNameFromRegexResult = methodNameRegex.exec(line);

				if(methodNameFromRegexResult) {
					if( ! isCallbackOpenLine(line) && isInMethod) {
						finish();
						reset();
					}
					isInMethod = true;
					methodCount++;
					methodName = methodNameFromRegexResult[1];
					methodArguments = extractMethodArguments(methodNameFromRegexResult[2]);
					checkMethodArguments(methodName, methodArguments);
				}

				if(isInMethod) {
					countCallbackNesting(line);
					methodLineCount++;
					if(isThereIfStatement(line)){
						checkForArgumentsInIfStatement(line);
					}

					if(isOpenCurlyBracketInLine(line)) {
						bracketCounter++;
					}

					if(isCloseCurlyBracketInLine(line)) {
						bracketCounter--;
						if(bracketCounter < 1) {
							methodLineCount = methodLineCount - 2;
							finish();
							reset();
						}
					}
				}

			}


			function checkForArgumentsInIfStatement(line) {
				_.each(methodArguments, (argument) => {
					const regex = new RegExp(`if\\s?\\(${argument}\\)`, 'g');
					const errorMessage = `  Argument ${argument.bold} in method ${methodName.bold} in file ${filePath.bold} should not be passed. ` +
						`Functions should do only one thing.`;

					if(line.match(regex)) {
						PrinterAdapter.title(`Boolean as argument problem`);
						PrinterAdapter.warning(errorMessage)
							
					}
				});
			}

			function countCallbackNesting(line) {
				if(isCallbackOpenLine(line)){
					if(isInCallback) {
						callbackNestingLines.push(line);
						callbackNesting++;
					}
					isInCallback = true;
				}

				if(isCallbackCloseLine(line)) {
					isInCallback = false;
				}
			}

			function reset() {
				isInMethod = false;
				callbackNestingLines = [];
				callbackNesting = 0;
				isInCallback = false;
				bracketCounter = 0;
				methodName = '';
				methodLineCount = 0;
			}

			function finish() {
				callbackNesting++;
				checkMethodLinesLength(methodName, methodLineCount);
				checkCallbackNesting(methodName, callbackNesting, callbackNestingLines);
				// PrinterAdapter.log('Method Sucessfully parsed!');
				// PrinterAdapter.log('Method name: ', methodName, 'Lines: ', methodLineCount);
			}
		}

		function checkMethodCount(methodCount) {
			if(methodCount > CONSTS.MAX_RECOMMENDED_METHODS) {
				PrinterAdapter.title(`Method count overflow`);
				PrinterAdapter.warning(
					`${methodCount} methods in file ${filePath.bold}. Recommended is less than ${CONSTS.MAX_RECOMMENDED_METHODS}`
				);
			} else if (methodCount > CONSTS.MAX_METHODS) {
				PrinterAdapter.title(`Method count overflow`);
				PrinterAdapter.warning(
					`${methodCount} methods in file ${filePath.bold}. Should be less than ${CONSTS.MAX_METHODS}`
				);
			}
		}

		function checkMethodArguments(methodName, methodArguments) {
			const errorMessage = `${methodArguments.length} arguments in method "${methodName.bold}" in file "${filePath.bold}". ` +
				`Recommended arguments length is ${CONSTS.ARGUMENTS_LENGTH}.`;

			if(methodArguments.length > CONSTS.ARGUMENTS_LENGTH) {
				PrinterAdapter.title(`Method arguments length violation`);
				PrinterAdapter.warning(errorMessage);
			}
		}

		function checkCallbackNesting(methodName, callbackNesting, callbackNestingLines) {
			const errorMessage = `Method ${methodName.bold} in file ${filePath.bold} has problem with callback nesting. ` +
					`Consider refactoring. `;

			if(callbackNesting > CONSTS.MAX_CALLBACK_NESTING_COUNT) {
				PrinterAdapter.title(`Callback hell`);
				PrinterAdapter.warning(errorMessage);
				PrinterAdapter.error('Lines: ');
				_.each(callbackNestingLines, (line) => {
					PrinterAdapter.error(line);
				})
			}
		}


		function checkMethodLinesLength(methodName, methodLineCount) {
			const errorMessage = `${methodLineCount} line of code in method "${methodName.bold}" in file "${filePath.bold}". ` +
				`Recommended line length is ${CONSTS.METHOD_LINES_LENGTH}.`;

			if(methodLineCount > CONSTS.METHOD_LINES_LENGTH) {
				PrinterAdapter.title(`Method lines length violation`);
				PrinterAdapter.warning(errorMessage);
			}
		}

	}

}


function isThereIfStatement(line) {
	return line.match(/if\(.+\)/g);
}

function extractMethodArguments(rawMethodArguments) {
	return rawMethodArguments.replace(/\(|\)/g, '').split(', ');
}

function isOpenCurlyBracketInLine(line) {
	return line.match(/{/g)
}

function isCloseCurlyBracketInLine(line) {
	return line.match(/}/g)
}

function isCallbackOpenLine(line) {
	return line.match(/=>\s?{|function\(.*\)\s?{/g);
}

function isCallbackCloseLine(line) {
	return line.match(/}\)/g);
}


module.exports = MethodParser;