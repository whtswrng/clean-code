import * as sinon from 'sinon';
import {REPORTS, TypescriptMethodCountParser} from "./method-count-parser";
import {FileCrawler} from "../../../file-crawler";
import {LineReader} from "../../../line-readers/line-reader";
import {DummyReporter} from "../../../reporters/dummy-reporter";
import {IFileCrawler} from "../../../file-crawler.interface";
import {LineParser} from "../../../line-parsers/line-parser";
import {config} from "../../../../../config";
import {IReporter} from "../../../reporters/reporter.interface";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Method Count Parser", () => {

    let reporter: IReporter;
    let methodCountParser: TypescriptMethodCountParser;
    let sandbox;
    let fileCrawler: IFileCrawler;

    beforeEach(async () => {
        sandbox = sinon.sandbox.create();
        reporter = new DummyReporter();
        methodCountParser = new TypescriptMethodCountParser(reporter, new LineParser());
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('when parse file with a lot of methods', () => {

        beforeEach( () => {
            fileCrawler = prepareFileForCrawling(
                methodCountParser, `${__dirname}/test/class-with-exceeded-method-count.test.ts`
            );
        });

        it(`should report that there are more than ${config.MAX_RECOMMENDED_METHODS_PER_CLASS} methods in class`, async () => {
            const reportSpy = sandbox.spy(reporter, 'report');

            await fileCrawler.start();

            sinon.assert.calledWith(reportSpy, REPORTS.METHOD_COUNT_EXCEEDED);
        });

    });

    describe('when parse file with not many methods', () => {

        beforeEach( () => {
            fileCrawler = prepareFileForCrawling(
                methodCountParser, `${__dirname}/test/class-with-not-many-method-count.test.ts`
            );
        });

        it(`should not report that there are more than ${config.MAX_RECOMMENDED_METHODS_PER_CLASS} methods in class`, async () => {
            const reportSpy = sandbox.spy(reporter, 'report');

            await fileCrawler.start();

            sinon.assert.notCalled(reportSpy);
        });

    });


});


export function prepareFileForCrawling(fileParser, path) {
    const fileCrawler = new FileCrawler(path, new LineReader(path));
    fileCrawler.addFileParser(fileParser);
    return fileCrawler;
}
