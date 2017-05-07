'use strict';
const CONSTS = require('../../consts');
const MethodCounter = require('../../services/MethodCounter').Counter;
const METHOD_CONSTS = require('../../services/MethodCounter').CONSTS;
const colors = require('colors');
const _ = require('lodash');
const PrinterAdapter = require('../../services/PrinterAdapter');

class MethodParser {

	static parse(lineReader, filePath) {
        return new Promise((resolve, reject) => {
            const methodNameRegex = /((?!if|for|while|switch\b)\b\w+\s?=?)\s?(\([a-zA-Z0-9,:\s]*\))\s?(=>)?\s?\{/g;
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
            lineReader.on('close', close);
            lineReader.on('error', reject);

            function close() {
                checkMethodCount(methodCount);
                resolve();
            }

            function parseLine(line) {
                const methodNameFromRegexResult = methodNameRegex.exec(line);

                if(isProperMethodHeadAndIsNotInFunctionOrCallback(methodNameFromRegexResult, line)) {
                    parseMethodHead(methodNameFromRegexResult, line);
                } else if (isInMethod) {
                    parseMethodBody( line);
                }
            }

            function isProperMethodHeadAndIsNotInFunctionOrCallback(methodDefinition, line) {
                return (methodDefinition || isAnonymousArrowFunctionLine(line))
                    && ( ! isInMethod || ! isCallbackLine(line));
            }

            function parseMethodHead(methodDefinition, line) {
                if( ! isCallbackLine(line) && isInMethod) {
                    MethodCounter.increase(METHOD_CONSTS.METHOD, 1);
                    finish();
                    reset();
                }

                isInMethod = true;
                methodCount++;
                bracketCounter++;

                if(methodDefinition) {
                    methodName = methodDefinition[1] || 'function';
                    methodArguments = extractMethodArguments(methodDefinition[2]);
                    checkMethodArguments(methodName, methodArguments);
                }
            }

            function parseMethodBody(line) {
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
                        methodLineCount = methodLineCount - 1;
                        finish();
                        reset();
                    }
                }
            }

            function checkForArgumentsInIfStatement(line) {
                _.each(methodArguments, (argument) => {
                    const regex = new RegExp(`if\\s?\\(${argument}\\)`, 'g');
                    const errorMessage = `Argument ${argument.bold} in method ${methodName.bold} in file ${filePath.bold} should not be passed. ` +
                        `Functions should do only one thing.`;

                    if(line.match(regex)) {
                        MethodCounter.increase(METHOD_CONSTS.BOOLEAN_AS_ARGUMENT, 1);
                        PrinterAdapter.title(`Boolean as argument problem`);
                        PrinterAdapter.warning(errorMessage)
                    }
                });
            }

            function countCallbackNesting(line) {
                if(isCallbackLine(line)){
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

            function checkMethodCount(methodCount) {
                if(methodCount > CONSTS.MAX_RECOMMENDED_METHODS) {
                    MethodCounter.increase(METHOD_CONSTS.METHOD_COUNT_OVERFLOW, 1);
                    PrinterAdapter.title(`Method count overflow`);
                    PrinterAdapter.warning(
                        `${methodCount} methods in file ${filePath.bold}. Recommended is less than ${CONSTS.MAX_RECOMMENDED_METHODS}`
                    );
                } else if (methodCount > CONSTS.MAX_METHODS) {
                    MethodCounter.increase(METHOD_CONSTS.METHOD_COUNT_OVERFLOW, 1);
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
                    MethodCounter.increase(METHOD_CONSTS.METHOD_ARGUMENT_LENGTH, 1);
                    PrinterAdapter.title(`Method arguments length violation`);
                    PrinterAdapter.warning(errorMessage);
                }
            }

            function checkCallbackNesting(methodName, callbackNesting, callbackNestingLines) {
                const errorMessage = `Method ${methodName.bold} in file ${filePath.bold} has problem with callback nesting. ` +
                    `Consider refactoring. `;

                if(callbackNesting > CONSTS.MAX_CALLBACK_NESTING_COUNT) {
                    MethodCounter.increase(METHOD_CONSTS.CALLBACK_HELL, 1);
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
                    MethodCounter.increase(METHOD_CONSTS.METHOD_LONG_LINE, 1);
                    PrinterAdapter.title(`Method lines length violation`);
                    PrinterAdapter.warning(errorMessage);
                }
            }

        });
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
	return line.match(/}(,.*)?\)/g);
}

function isAnonymousArrowFunctionLine(line) {
    return line.match(/(\([a-zA-Z0-9,\s]*\))\s?(=>){1}\s?\{/g);
}

function isCallbackLine(line) {
    return isMatchingCallbackAndArrowFunctions() || isMatchingArrowFunctionsWithoutBrackets();

    function isMatchingCallbackAndArrowFunctions() {
        return line.match(/.+(\({1}|,)\s?.*(\([a-zA-Z0-9,\s]*\))\s?(=>)?\s?\{/g);
    }

    function isMatchingArrowFunctionsWithoutBrackets() {
        return line.match(/.+(\({1}|,)\s?.*([a-zA-Z0-9,\s]*)\s?(=>){1}\s?\{/g);
    }
}


module.exports = MethodParser;
