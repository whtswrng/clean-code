import {FileSystemCrawler} from "./file-system-crawler";
import {DummyExtensionFileValidator} from "./validators/dummy-extension-file-validator";
import {DummyFileCrawlerFactory} from "./dummy-file-crawler-factory";
import {DummyFileDeterminer} from "./determiners/dummy-file-determiner";
import {DummyDirectoryCrawler} from "./dummy-directory-crawler";
import * as sinon from 'sinon';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("File System Crawler", () => {

    const fileExtensionValidator = new DummyExtensionFileValidator();
    const fileCrawlerFactory = new DummyFileCrawlerFactory();
    const fileDeterminer = new DummyFileDeterminer();
    const directoryCrawler = new DummyDirectoryCrawler();
    const pathForCrawling = 'foo';

    const fileSystemCrawler = new FileSystemCrawler(
        pathForCrawling, fileCrawlerFactory, fileExtensionValidator, fileDeterminer, directoryCrawler
    );

    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should call directory crawler when it is a directory', async () => {
        givenFileDeterminerIsDirectory(true);
        const recursiveSpy = givenDirectoryCrawlerRecursive([]);

        await fileSystemCrawler.start();

        sinon.assert.calledOnce(recursiveSpy);
    });

    it('should not call directory crawler when it is a file', async () => {
        givenFileDeterminerIsDirectory(false);
        givenFileDeterminerIsFile(true);
        const recursiveSpy = givenDirectoryCrawlerRecursive(null);

        await fileSystemCrawler.start();

        sinon.assert.notCalled(recursiveSpy);
    });

    it("should properly instantiated single file crawler with not recursive directory searching", async () => {
        givenFileDeterminerIsDirectory(false);
        givenFileDeterminerIsFile(true);
        const hasCorrectExtensionSpy = givenFileValidatorHasCorrectExtension(true);
        const crawlerFactoryInstantiateSpy = spyFileCrawlerFactoryInstantiate();

        await fileSystemCrawler.start();

        sinon.assert.calledOnce(hasCorrectExtensionSpy);
        sinon.assert.calledWith(crawlerFactoryInstantiateSpy, pathForCrawling);
    });

    it("should properly instantiated 2 file crawlers while recursive directory searching", async () => {
        givenFileDeterminerIsDirectory(true);
        givenFileDeterminerIsFile(false);
        givenDirectoryCrawlerRecursive(['foo', 'bar']);
        const hasCorrectExtensionSpy = givenFileValidatorHasCorrectExtension(true);
        const crawlerFactoryInstantiateSpy = spyFileCrawlerFactoryInstantiate();

        await fileSystemCrawler.start();

        sinon.assert.calledTwice(hasCorrectExtensionSpy);
        sinon.assert.calledWith(crawlerFactoryInstantiateSpy, 'foo');
        sinon.assert.calledWith(crawlerFactoryInstantiateSpy, 'bar');
    });


    function givenFileDeterminerIsDirectory(isDirectory) {
        return sandbox.stub(fileDeterminer, 'isDirectory').returns(Promise.resolve(isDirectory));
    }

    function givenFileDeterminerIsFile(isFile) {
        return sandbox.stub(fileDeterminer, 'isFile').returns(Promise.resolve(isFile));
    }

    function givenFileValidatorHasCorrectExtension(hasCorrectExtension) {
        return sandbox.stub(fileExtensionValidator, 'hasCorrectFileExtension')
            .returns(Promise.resolve(hasCorrectExtension));
    }

    function givenDirectoryCrawlerRecursive(files) {
        return sandbox.stub(directoryCrawler, 'recursive').returns(Promise.resolve(files));
    }

    function spyFileCrawlerFactoryInstantiate() {
        return sandbox.spy(fileCrawlerFactory, 'instantiate');
    }

});
