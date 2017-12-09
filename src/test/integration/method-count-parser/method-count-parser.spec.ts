import * as sinon from 'sinon';
import {REPORTS, TypescriptMethodCountParser} from "../../../app/crawlers/file-parsers/typescript/method-count-parser/method-count-parser";
import {DummyReporter} from "../../../app/crawlers/reporters/dummy-reporter";
import {IFileCrawler} from "../../../app/crawlers/file-crawler.interface";
import {LineValidator} from "../../../app/crawlers/line-validators/line-validator";
import {config} from "../../../config";
import {IReporter} from "../../../app/crawlers/reporters/reporter.interface";
import {prepareFileForCrawling} from "../../../app/crawlers/file-parsers/helpers";

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
        methodCountParser = new TypescriptMethodCountParser(reporter, new LineValidator());
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

    describe('when parse file which has 9 methods and a lot of junk in it', () => {

        beforeEach( () => {
            fileCrawler = prepareFileForCrawling(
                methodCountParser, `${__dirname}/test/class-with-9-methods-and-junk.test.ts`
            );
        });

        it(`should not report that there are more than ${config.MAX_RECOMMENDED_METHODS_PER_CLASS} methods in class`, async () => {
            const reportSpy = sandbox.spy(reporter, 'report');

            await fileCrawler.start();

            sinon.assert.notCalled(reportSpy);
        });

    });


});

