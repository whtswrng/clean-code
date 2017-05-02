const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const ClassParser = require('./ClassParser');
const PrinterAdapter = require('../../services/PrinterAdapter');
const sinon = require('sinon');
const assert = chai.assert;
const path = require('path');
// const Readable = require('stream').Readable;

describe('ClassParser', function() {
	let lineReader;
	let fileMockPath;

	before(() => {
        sinon.stub(console, "error").callsFake(() => {});
	});

    after(() => {
        console.error.restore();
    });

	beforeEach(() => {

        fileMockPath = path.resolve('../app/parsers/class/ClassParser.mock.js');
		sinon.spy(PrinterAdapter, 'title');
        sinon.spy(PrinterAdapter, 'warning');
        lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(fileMockPath)
        });
	});

	afterEach(() => {
		PrinterAdapter.title.restore();
        PrinterAdapter.warning.restore();
	});

	describe('check lines method', () => {

        it('should violate class lines length', () => {
            return ClassParser.checkLines(lineReader, 'FOO.js').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Class lines length violation');
                expect(getWarningCallsArguments(0)).to.equal('Found 223 lines in file "\u001b[1mFOO.js\u001b[22m". Recommended is 200.');
            });
        });

    });

	describe('parse method', () => {

        it('should violate class rule', () => {
            return ClassParser.parse(fileMockPath).then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Class rule violation');
                expect(getWarningCallsArguments(0)).to.equal('Found 2 classes definition in file "' + fileMockPath.bold +'", please consider refactoring.');
            });
        });

        it('should violate class name rule', () => {
            return ClassParser.parse(fileMockPath).then(() => {
                expect(getTitleCallsArguments(1)).to.equal('Class name rule violation');
                expect(getWarningCallsArguments(1)).to.equal('Wrong class name \u001b[1m"class FooProcessor"\u001b[22m in file "' + fileMockPath.bold +'". You should avoid using words in class names like \u001b[1mProcessor, Manager, Data, Info.\u001b[22m');
            });
        });

    });

});


function getTitleCallsArguments(callIndex) {
	return PrinterAdapter.title.getCalls()[callIndex].args[0];
}

function getWarningCallsArguments(callIndex) {
    return PrinterAdapter.warning.getCalls()[callIndex].args[0];
}
