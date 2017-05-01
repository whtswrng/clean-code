'strict mode'
const fs = require('fs');
const colors = require('colors');
const filePathArgument = process.argv[2];
const RULES = require('./rules');
const MethodParser = require('./parsers/MethodParser');
const ClassParser = require('./parsers/ClassParser');

if( ! filePathArgument) {
	return console.error('You must put file path as first argument.'.underline.yellow)
}

const lineReader = require('readline').createInterface({
	input: require('fs').createReadStream(filePathArgument)
});

ClassParser.checkLines(lineReader, filePathArgument);
MethodParser.parse(lineReader, filePathArgument);
ClassParser.parse(filePathArgument);


