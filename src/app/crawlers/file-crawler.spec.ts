import {FileCrawler} from "./file-crawler";
import {DummyFileParser} from "./file-parsers/dummy-file-parser";
import * as sinon from 'sinon';
import {DummyLineReader} from "./line-readers/dummy-line-reader";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("File Crawler", () => {

    const fileCrawler = new FileCrawler('some dir path', new DummyLineReader());

    it('should call start method for newly added file parser', () => {
        const dummyFileParser = new DummyFileParser();
        const startMethod = sinon.spy(dummyFileParser, 'start');

        fileCrawler.addFileParser(dummyFileParser);
        fileCrawler.start();

        expect(startMethod.calledOnce).to.eq(true);
    });

});