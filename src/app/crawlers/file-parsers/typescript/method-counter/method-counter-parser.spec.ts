import {expect} from 'chai';
import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import {TypescriptMethodCounterParser} from "./method-counter-parser";
import {IReporter} from "../../../reporters/reporter.interface";
import {TypeScriptLineParser} from "../../../line-validators/type-script-line-parser";
import {TypeScriptClassReporter} from "../../../reporters/typescript/type-script-class-reporter";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Typescript Method Counter Parser', () => {

    let methodCounterParser: TypescriptMethodCounterParser;
    let reporter: TypeScriptClassReporter;
    let lineParser: TypeScriptLineParser;

    beforeEach((() => {
        reporter = {
            print: sinon.spy(),
            reportPrivateMethod: sinon.spy(),
            reportPublicMethod: sinon.spy()
        };
        lineParser = new TypeScriptLineParser();
        methodCounterParser = new TypescriptMethodCounterParser(reporter, lineParser);
        methodCounterParser.start('foo');
    }));


    it('should be properly created', () => {
        expect(methodCounterParser).to.be.instanceof(TypescriptMethodCounterParser);
    });

    it('should report nothing if code does not contain any methods', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).not.to.have.been.called;
    });

    it('should report private method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('private foo() {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).to.have.been.calledOnce;
    });

    it('should report private ASYNC method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('private async bleb() {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).to.have.been.calledOnce;
    });

    it('should report private ASYNC method with arguments', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('private async bleb(bar, blub, jep) {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).to.have.been.calledOnce;
    });

    it('should report public method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('public foo() {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });

    it('should report public ASYNC method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('public async bleb() {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });

    it('should report public ASYNC method with arguments', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('public async bleb(bar, blub, jep) {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });
});
