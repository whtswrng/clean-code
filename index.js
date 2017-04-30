'strict mode'
const fs = require('fs');
const colors = require('colors');
const filePathArgument = process.argv[2] || console.error('You must put file path as first argument.'.underline.red); 
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(filePathArgument)
});


//parseFile(lineReader);

function parseFile(lineReader){
	lineReader.on('line', (line) => {
		console.log('line: ' + line);
	});
}

fs.readFile(filePathArgument, 'UTF-8', (err, rawFileString) => {
	if(err) {
		throw new Error(`File ${filePathArgument} does not exists.`);
	}
	const classRegexp = /class \w+.\{/g;
	const classMatches = rawFileString.match(classRegexp);

	console.log(classMatches.length);
	if(classMatches.length > 1){
		throw new Error(`Found ${classMatches.length} classes definition in file ${filePathArgument}, please consider refactoring.`);
	}
})