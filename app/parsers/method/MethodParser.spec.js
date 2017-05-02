const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const MethodParser = require('./MethodParser');
const colors = require('colors');
const PrinterAdapter = require('../../services/PrinterAdapter');
const sinon = require('sinon');
const assert = chai.assert;
const path = require('path');
const Readable = require('stream').Readable;
const Mock = require('./Mock');

describe('MethodParser', function() {
	let lineReader;
	let stream;

	before(() => {
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

	describe('parse method', () => {

		it('should violate callback nesting problem with es6 syntax', (done) => {
            MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Callback hell');
                expectPrinderAdapterCallsToEqual(1);
            	done();
            }).catch(done);
            streamAsFile(Mock.nestedCallbacksES6);
		});

        it('should violate callback nesting problem with es5 syntax', (done) => {
            MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Callback hell');
                expectPrinderAdapterCallsToEqual(1);
                done();
            }).catch(done);
            streamAsFile(Mock.nestedCallbacksES5);
        });

        it('should violate long lines in method', (done) => {
            MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Method lines length violation');
                expectPrinderAdapterCallsToEqual(1);
                done();
            }).catch(done);
            streamAsFile(Mock.longMethod);
        });

        it('should violate method arguments length', (done) => {
            MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Method arguments length violation');
                expectPrinderAdapterCallsToEqual(2);
                done();
            }).catch(done);
            streamAsFile(Mock.argumentsViolation);
        });

        it('should violate method arguments length', (done) => {
            MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Method arguments length violation');
                expectPrinderAdapterCallsToEqual(2);
                done();
            }).catch(done);
            streamAsFile(Mock.argumentsViolation);
        });

        it('should violate boolean as argument', (done) => {
            MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Boolean as argument problem');
                expectPrinderAdapterCallsToEqual(2);
                done();
            }).catch(done);
            streamAsFile(Mock.booleanAsArgument);
        });

        it('should violate method count overflow', (done) => {
            MethodParser.parse(lineReader, 'FOO').then(() => {
                expect(getTitleCallsArguments(0)).to.equal('Method count overflow');
                expect(getWarningCallsArguments(0)).to.equal('12 methods in file \u001b[1mFOO\u001b[22m. Recommended is less than 10');
                expectPrinderAdapterCallsToEqual(1);
                done();
            }).catch(done);
            streamAsFile(Mock.methodOverFlow);
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

function expectPrinderAdapterCallsToEqual(number) {
    expect(PrinterAdapter.title.getCalls().length).to.equal(number);
    expect(PrinterAdapter.warning.getCalls().length).to.equal(number);
}
