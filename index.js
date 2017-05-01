'strict mode'
const fs = require('fs');
const colors = require('colors');
const filePathArgument = process.argv[2];
const _ = require('lodash');
const RULES = require('./rules');

if( ! filePathArgument) {
	return console.error('You must put file path as first argument.'.underline.yellow)
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(filePathArgument)
});


parseMethods(lineReader);

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
		console.error(`✖ Class name rule violation`.underline.red);
		console.error(errorMessage.underline.yellow);
	}
}

function checkMethods(rawFileString) {
	const methodsRegex = /(\w+)(\(.*\))\s+\{(.|[\r\n]+?)*?\}/g;
	const matches = methodsRegex.exec(rawFileString);

	console.log(matches);
}

function checkMethodArguments(methodName, methodArguments) {
	const argumentMatches = methodArguments.split(',');
	const errorMessage = `  ${argumentMatches.length} arguments in method "${methodName.bold}" in file "${filePathArgument.bold}". ` + 
		`Recommended arguments length is ${RULES.ARGUMENTS_LENGTH}.`;

	if(argumentMatches.length > RULES.ARGUMENTS_LENGTH) {
		console.error(`✖ Method arguments length violation`.underline.red);
		console.error(errorMessage.underline.yellow);
	}
}

function checkMethodLinesLength(methodName, methodLineCount) {
	const errorMessage = `  ${methodLineCount} line of code in method "${methodName.bold}" in file "${filePathArgument.bold}". ` + 
		`Recommended line length is ${RULES.METHOD_LINES_LENGTH}.`;

	if(methodLineCount > RULES.METHOD_LINES_LENGTH) {
		console.error(`✖ Method lines length violation`.underline.red);
		console.error(errorMessage.underline.yellow);
	}
}

function parseMethods(lineReader){
	const methodNameRegex = /((?!if|for|while|switch\b)\b\w+)(\(.*\))\s+\{/g;
	let methodLineCount = 0;
	let methodName = '';
	let isInMethod = false;
	let bracketCounter = 0;

	lineReader.on('line', (line) => {
		const methodNameFromRegexResult = methodNameRegex.exec(line);

		if(methodNameFromRegexResult) {
			isInMethod = true;
			methodName = methodNameFromRegexResult[1];
			checkMethodArguments(methodName, methodNameFromRegexResult[2]);
		}

		if(isInMethod) {
			methodLineCount++;

			if(line.match(/.{/g)) {
				bracketCounter++;
			}

			if(line.match(/.}/g)) {
				bracketCounter--;
				if(bracketCounter < 1) {
					methodLineCount = methodLineCount - 2;
					finish();
					reset();
				}
			}
		}
	});

	function reset() {
		isInMethod = false;
		bracketCounter = 0;
		methodName = '';
		methodLineCount = 0;
	}

	function finish() {
		checkMethodLinesLength(methodName, methodLineCount);
		// console.log('Method Sucessfully parsed!');
		// console.log('Method name: ', methodName, 'Lines: ', methodLineCount);	
	}
}
