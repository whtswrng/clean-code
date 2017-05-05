const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const ClassParser = require('./ClassParser');
const PrinterAdapter = require('../../services/PrinterAdapter');
const sinon = require('sinon');
const assert = chai.assert;
const path = require('path');
const Readable = require('stream').Readable;
const Mock = require('./Mock');

describe('ClassParser', function() {
	let lineReader;
	let stream;
	let fileMockPath;

    before(() => {
        fileMockPath = path.resolve('../app/parsers/class/Mock.js');
        sinon.stub(console, "error").callsFake(() => {});
    });

    after(() => {
        console.error.restore();
    });

    beforeEach(() => {
        stream = new Readable();
        stream._read = function() {};
        sinon.spy(PrinterAdapter, 'title');
        sinon.spy(PrinterAdapter, 'warning');
        lineReader = require('readline').createInterface({
            input: stream
        });
    });

	afterEach(() => {
		PrinterAdapter.title.restore();
        PrinterAdapter.warning.restore();
	});

	describe('check lines method', () => {

        it('should violate class lines length', (done) => {
            ClassParser.assertLinesLength(lineReader, 'FOO.js').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Class lines length violation');
                expect(getWarningCallsArguments(0)).to.equal('Found 351 lines in file "\u001b[1mFOO.js\u001b[22m". Recommended is 200.');
                done();
            }).catch(done);
            streamAsFile(Mock.classLineLength)
        });

    });

    describe('parse method', () => {

        it('should violate class name rule', (done) => {
            ClassParser.parse(fileMockPath).then(() => {
                expect(getTitleCallsArguments(1)).to.equal('Class name rule violation');
                expect(getWarningCallsArguments(1)).to.equal('Wrong class name \u001b[1m"class FooProcessor"\u001b[22m in file "' + fileMockPath.bold +'". You should avoid using words in class names like \u001b[1mProcessor, Manager, Data, Info.\u001b[22m');
                done();
            }).catch(done);
        });

        it('should violate class rule', (done) => {
            ClassParser.parse(fileMockPath).then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Class rule violation');
                expect(getWarningCallsArguments(0)).to.equal('Found 2 classes definition in file "' + fileMockPath.bold +'", please consider refactoring.');
                done();
            }).catch(done);
        });
    });

    function streamAsFile(string) {
        stream.push(string);
        stream.push(null);
    }
});


function getTitleCallsArguments(callIndex) {
	return PrinterAdapter.title.getCalls()[callIndex].args[0];
}

function getWarningCallsArguments(callIndex) {
    return PrinterAdapter.warning.getCalls()[callIndex].args[0];
}
