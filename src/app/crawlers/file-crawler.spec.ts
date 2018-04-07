import {FileCrawler} from "./file-crawler";
import {DummyFileParser} from "./file-parsers/dummy-file-parser";
import * as sinon from 'sinon';
import {DummyLineReader} from "./line-readers/dummy-line-reader";
import {LineReader} from "./line-readers/line-reader";
import {DummyReporter} from "./reporters/dummy-reporter";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const dummyReporter = new DummyReporter();

chai.use(chaiAsPromised);

describe("File Crawler", () => {

    it('should call start method for newly added file parser', () => {
        const fileCrawler = new FileCrawler('some dir path', new DummyLineReader(), dummyReporter);
        const fileParser = new DummyFileParser();
        const startMethod = sinon.spy(fileParser, 'start');

        fileCrawler.addFileParser(fileParser);
        fileCrawler.start();

        expect(startMethod.calledOnce).to.eq(true);
    });

    it('should properly crawl a file', async () => {
        const pathToCrawl = __filename;
        const fileCrawler = new FileCrawler(pathToCrawl, new LineReader(pathToCrawl), dummyReporter);
        const fileParser = new DummyFileParser();
        const sandbox = sinon.sandbox.create();
        const startSpy = sandbox.spy(fileParser, 'start');
        const readLineSpy = sandbox.spy(fileParser, 'readLine');
        const stopSpy = sandbox.spy(fileParser, 'stop');

        fileCrawler.addFileParser(fileParser);
        await fileCrawler.start();

        sinon.assert.calledOnce(startSpy);
        sinon.assert.called(readLineSpy);
        sinon.assert.calledOnce(stopSpy);
        sandbox.restore();
    });

});
