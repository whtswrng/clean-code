const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const ClassParser = require('./ClassParser');
const sinon = require('sinon');
const assert = chai.assert;

describe('ClassParser', function() {
	let lineReader;
	let consoleSpy = function(data){
		console.log(data)
	};

	beforeEach(() => {
		lineReader = require('readline').createInterface({
			input: require('fs').createReadStream('./ClassParser.mock.js')
		});
		consoleSpy = sinon.spy(console, 'error');
	})

	it('should somethig', () => {
		ClassParser.checkLines(lineReader, 'FOO');
		// sinon.assert.calledWith(consoleSpy, "foo")
		console.log(consoleSpy.getCalls());
	});

	

});