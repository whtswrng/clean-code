import * as sinon from 'sinon';
import {DummyReporter} from "../../../reporters/dummy-reporter";
import {LineValidator} from "../../../line-validators/line-validator";
import {config} from "../../../../../config";
import {IReporter} from "../../../reporters/reporter.interface";
import {REPORTS, TypescriptMethodLinesCountParser} from "./method-lines-count-parser";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Method Line Count Parser", () => {

    let reporter: IReporter;
    let methodParameterParser: TypescriptMethodLinesCountParser;
    let sandbox;

    beforeEach(async () => {
        sandbox = sinon.sandbox.create();
        reporter = new DummyReporter();
        methodParameterParser = new TypescriptMethodLinesCountParser(reporter, new LineValidator());
    });

    afterEach(function () {
        sandbox.restore();
    });

    it(`should report method lines count exceeded when there are a lot of lines in function`, async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        const functionWithBunchOfLines = [
            'function aLotOfLinesOfCode() {',
            '','','','','','','','','','','',  // 11 lines of function
            '}'
        ];

        functionWithBunchOfLines.forEach((line) => methodParameterParser.readLine(line));

        sinon.assert.calledOnce(reportSpy);
        sinon.assert.calledWith(reportSpy, REPORTS.METHOD_LINES_COUNT_EXCEEDED);
    });

    it(`should not report method lines count exceeded when there are not a lot of lines in function`, async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        const functionWithBunchOfLines = [
            'function aLotOfLinesOfCode() {',
            '','','',  // 3 lines of function
            '}'
        ];

        functionWithBunchOfLines.forEach((line) => methodParameterParser.readLine(line));

        sinon.assert.notCalled(reportSpy);
    });

    it(`should 2x report function lines count exceeded when there are 2 functions with a lot of lines of code`, async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        const functionWithBunchOfLines = [
            'function aLotOfLinesOfCode() {',
            '','','','','','','','','','','',  // 11 lines of function
            '}',
            '',
            'function anotherLinesOfCode() {',
            '','','','','','','','','','','', '',  // 11 lines of function
            '}'
        ];

        functionWithBunchOfLines.forEach((line) => methodParameterParser.readLine(line));

        sinon.assert.calledTwice(reportSpy);
        sinon.assert.calledWith(reportSpy, REPORTS.METHOD_LINES_COUNT_EXCEEDED);
    });

    it(`should report function lines count exceeded when there are 2 functions, but one has a lot of lines of code`, async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        const functionWithBunchOfLines = [
            'function aLotOfLinesOfCode() {',
            '','','','','','','','','','','',  // 11 lines of function
            '}',
            '',
            'function anotherLinesOfCode() {',
            '','','','',  // 4 lines of function
            '}'
        ];

        functionWithBunchOfLines.forEach((line) => methodParameterParser.readLine(line));

        sinon.assert.calledOnce(reportSpy);
        sinon.assert.calledWith(reportSpy, REPORTS.METHOD_LINES_COUNT_EXCEEDED);
    });

    it(`should not report function lines count exceeded when there are 2 functions, but non of them has a lot of lines of code`, async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        const functionWithBunchOfLines = [
            'public async process(): Promise<void> {',
            'if (await this.fileDeterminer.isDirectory(this.path)) {',
            'return this.parseRecursiveFolder(this.path);',
            '} else if (await this.fileDeterminer.isFile(this.path)) {',
            'return this.parseFile(this.path);',
            '}',
            '}',
            '',
            'private async parseRecursiveFolder(path): Promise<void> {',
            '      const files = await this.directoryCrawler.recursive(path);',
            'await Promise.all(_.map(files, (file) => this.parseFile(file)));',
            '}'
        ];

        functionWithBunchOfLines.forEach((line) => methodParameterParser.readLine(line));

        sinon.assert.notCalled(reportSpy);
    });



});
