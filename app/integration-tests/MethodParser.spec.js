const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const MethodParser = require('../parsers/method/MethodParser');
const colors = require('colors');
const PrinterAdapter = require('../services/PrinterAdapter');
const sinon = require('sinon');
const assert = chai.assert;
const path = require('path');

// const Readable = require('stream').Readable;

describe('MethodParser', function() {
	let lineReader;
	let fileMockPath;

	before(() => {
        sinon.stub(console, "error").callsFake(() => {});
	});

    after(() => {
        console.error.restore();
    });

	beforeEach(() => {
	    fileMockPath = path.resolve('../app/integration-tests/MethodParser.mock.js');
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

	describe('parse method', () => {

		it('should violate method arguments length', () => {
            return MethodParser.parse(lineReader, 'FOO').then(() => {
				expect(getTitleCallsArguments(0)).to.equal('Method arguments length violation');
                expect(getWarningCallsArguments(0)).to.equal('4 arguments in method "\u001b[1mconstructor\u001b[22m" in file "\u001b[1mFOO\u001b[22m". Recommended arguments length is 3.');
			});
		});

        it('should be callback hell', () => {
            return MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(1)).to.equal('Callback hell');
                expect(getWarningCallsArguments(1)).to.equal('Method \u001b[1mgetAllFoo\u001b[22m in file \u001b[1mFOO\u001b[22m has problem with callback nesting. Consider refactoring. ');
            });
        });

        it('should violate method lines length', () => {
            return MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(2)).to.equal('Method lines length violation');
                expect(getWarningCallsArguments(2)).to.equal('22 line of code in method "\u001b[1mgetAllFoo\u001b[22m" in file "\u001b[1mFOO\u001b[22m". Recommended line length is 20.');

            });
        });

        it('should violate boolean as argument', () => {
            return MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(3)).to.equal('Boolean as argument problem');
                expect(getWarningCallsArguments(3)).to.equal('Argument \u001b[1mthird\u001b[22m in method \u001b[1mgetAllFoo\u001b[22m in file \u001b[1mFOO\u001b[22m should not be passed. Functions should do only one thing.');
            });
        });

        it('should violate method count overflow', () => {
            return MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(4)).to.equal('Method count overflow');
                expect(getWarningCallsArguments(4)).to.equal('18 methods in file \u001b[1mFOO\u001b[22m. Recommended is less than 10');
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
