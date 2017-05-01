'use strict'
const RULES = require('../rules');
const _ = require('lodash');

class MethodParser {

	static parse(lineReader, filePath) {
		parseMethods(lineReader);

		function parseMethods(lineReader){
			const methodNameRegex = /((?!if|for|while|switch\b)\b\w+)\s?(\(.*\))\s+\{/g;
			let methodLineCount = 0;
			let methodName = '';
			let methodArguments = [];
			let methodCount = 0;
			let callbackNesting = 0;
			let isInCallback = false;
			let isInMethod = false;
			let bracketCounter = 0;

			lineReader.on('line', parseLine);

			lineReader.on('close', () => checkMethodCount(methodCount));

			function parseLine(line) {
				const methodNameFromRegexResult = methodNameRegex.exec(line);

				if(methodNameFromRegexResult) {
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
						console.error('\n');
						console.error(`✖ Boolean as argument problem`.underline.red);
						console.error(errorMessage.underline.yellow)
							
					}
				});
			}

			function countCallbackNesting(line) {
				if(isCallbackOpenLine(line)){
					if(isInCallback) {
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
				callbackNesting = 0;
				isInCallback = false;
				bracketCounter = 0;
				methodName = '';
				methodLineCount = 0;
			}

			function finish() {
				callbackNesting++;
				checkMethodLinesLength(methodName, methodLineCount);
				checkCallbackNesting(methodName, callbackNesting);
				// console.log('Method Sucessfully parsed!');
				// console.log('Method name: ', methodName, 'Lines: ', methodLineCount);	
			}
		}

		function checkMethodCount(methodCount) {
			if(methodCount > RULES.MAX_RECOMMENDED_METHODS) {
				console.error('\n');
				console.error(`✖ Method count overflow`.underline.yellow);
				console.error(`  ${methodCount} methods in file ${filePath.bold}. Recommended is less than ${RULES.MAX_RECOMMENDED_METHODS}`.underline.yellow);
			} else if (methodCount > RULES.MAX_METHODS) {
				console.error('\n');
				console.error(`✖ Method count overflow`.underline.red);
				console.error(`  ${methodCount} methods in file ${filePath.bold}. Should be less than ${RULES.MAX_METHODS}`.underline.yellow);
			}
		}

		function checkMethodArguments(methodName, methodArguments) {
			const errorMessage = `  ${methodArguments.length} arguments in method "${methodName.bold}" in file "${filePath.bold}". ` + 
				`Recommended arguments length is ${RULES.ARGUMENTS_LENGTH}.`;

			if(methodArguments.length > RULES.ARGUMENTS_LENGTH) {
				console.error('\n');
				console.error(`✖ Method arguments length violation`.underline.red);
				console.error(errorMessage.underline.yellow);
			}
		}

		function checkCallbackNesting(methodName, callbackNesting) {
			const errorMessage = `  Method ${methodName.bold} in file ${filePath.bold} has ${callbackNesting} callback nesting. ` +
					`Consider refactoring.`;

			if(callbackNesting > RULES.MAX_CALLBACK_NESTING_COUNT) {
				console.error('\n');
				console.error(`✖ Callback hell`.underline.red);
				console.error(errorMessage.underline.yellow);
			}
		}


		function checkMethodLinesLength(methodName, methodLineCount) {
			const errorMessage = `  ${methodLineCount} line of code in method "${methodName.bold}" in file "${filePath.bold}". ` + 
				`Recommended line length is ${RULES.METHOD_LINES_LENGTH}.`;

			if(methodLineCount > RULES.METHOD_LINES_LENGTH) {
				console.error('\n');
				console.error(`✖ Method lines length violation`.underline.red);
				console.error(errorMessage.underline.yellow);
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
	return line.match(/.{/g)
}

function isCloseCurlyBracketInLine(line) {
	return line.match(/.}/g)
}

function isCallbackOpenLine(line) {
	return line.match(/=>\s?{/g);
}

function isCallbackCloseLine(line) {
	return line.match(/}\)/g);
}


module.exports = MethodParser;