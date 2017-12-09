import * as sinon from 'sinon';
import {IReporter} from "../../../app/crawlers/reporters/reporter.interface";
import {
    REPORTS,
    TypescriptMethodParametersParser
} from "../../../app/crawlers/file-parsers/typescript/method-parameters-parser/method-parameters-parser";
import {IFileCrawler} from "../../../app/crawlers/file-crawler.interface";
import {DummyReporter} from "../../../app/crawlers/reporters/dummy-reporter";
import {LineValidator} from "../../../app/crawlers/line-parsers/line-validator";
import {prepareFileForCrawling} from "../../../app/crawlers/file-parsers/helpers";
import {config} from "../../../config";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Method Parameters Parser", () => {

    let reporter: IReporter;
    let methodParameterParser: TypescriptMethodParametersParser;
    let sandbox;
    let fileCrawler: IFileCrawler;

    beforeEach(async () => {
        sandbox = sinon.sandbox.create();
        reporter = new DummyReporter();
        methodParameterParser = new TypescriptMethodParametersParser(reporter, new LineValidator());
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('when parse file with 3 methods exceeding parameters count', () => {

        beforeEach( () => {
            fileCrawler = prepareFileForCrawling(
                methodParameterParser, `${__dirname}/test/class-with-2-methods-exceeded-parameters-count.test.ts`
            );
        });

        it(`should report that there are more than ${config.MAX_FUNCTION_PARAMETERS_LENGTH} methods in class`, async () => {
            const reportSpy = sandbox.spy(reporter, 'report');

            await fileCrawler.start();

            sinon.assert.calledThrice(reportSpy);
            sinon.assert.calledWith(reportSpy, REPORTS.FUNCTION_PARAMETERS_EXCEEDED);
        });

    });


});

