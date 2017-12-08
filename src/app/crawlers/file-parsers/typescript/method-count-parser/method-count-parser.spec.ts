import * as sinon from 'sinon';
import {REPORTS, TypescriptMethodCountParser} from "./method-count-parser";
import {FileCrawler} from "../../../file-crawler";
import {LineReader} from "../../../line-readers/line-reader";
import {DummyReporter} from "../../../reporters/dummy-reporter";
import {IFileCrawler} from "../../../file-crawler.interface";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Method Count Parser", () => {

    const reporter = new DummyReporter();
    const methodCountParser = new TypescriptMethodCountParser(reporter);
    const path = `${__dirname}/test/class-with-two-methods.test.ts`;
    let sandbox;
    let fileCrawler: IFileCrawler;

    beforeEach(async () => {
        sandbox = sinon.sandbox.create();
        fileCrawler = new FileCrawler(path, new LineReader(path));
        fileCrawler.addFileParser(methodCountParser);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should properly execute', async () => {
        const startSpy = sandbox.spy(methodCountParser, 'start');
        const readLineSpy = sandbox.spy(methodCountParser, 'readLine');
        const stopSpy = sandbox.spy(methodCountParser, 'stop');

        await fileCrawler.start();

        sinon.assert.calledOnce(startSpy);
        sinon.assert.called(readLineSpy);
        sinon.assert.calledOnce(stopSpy);
    });

    it('should report that there are 2 methods', async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        await fileCrawler.start();

        sinon.assert.calledWith(reportSpy, REPORTS.MORE_THAN_2_METHODS);
    });

});
