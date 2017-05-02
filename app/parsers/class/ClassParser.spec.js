const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const ClassParser = require('./ClassParser');
const PrinterAdapter = require('../../services/PrinterAdapter');
const sinon = require('sinon');
const assert = chai.assert;
// const Readable = require('stream').Readable;

describe('ClassParser', function() {
	let lineReader;

	before(() => {
        sinon.stub(console, "error").callsFake(() => {});
	});

    after(() => {
        console.error.restore();
    });

	beforeEach(() => {
		sinon.spy(PrinterAdapter, 'title');
        sinon.spy(PrinterAdapter, 'warning');
        lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('../../mocks/ClassOne.mock.js')
        });
	});

	afterEach(() => {
		PrinterAdapter.title.restore();
        PrinterAdapter.warning.restore();
	});

    it('should violate class lines length', () => {
		return ClassParser.checkLines(lineReader, 'FOO.js').then(() => {
			expect(getTitleCallArguments()).to.equal('Class lines length violation');
			expect(getWarningCallArguments()).to.equal('Found 220 lines in file "\u001b[1mFOO.js\u001b[22m". Recommended is 200.');
		});
	});

    it('should violate class lines length', () => {
        return ClassParser.checkLines(lineReader, 'FOO.js').then(() => {
            expect(getTitleCallArguments()).to.equal('Class lines length violation');
            expect(getWarningCallArguments()).to.equal('Found 220 lines in file "\u001b[1mFOO.js\u001b[22m". Recommended is 200.');
        });
    });

});


function getTitleCallArguments() {
	return PrinterAdapter.title.getCalls()[0].args[0];
}

function getWarningCallArguments() {
    return PrinterAdapter.warning.getCalls()[0].args[0];
}

