import {FileExtensionValidator} from "./file-extension-validator";
import {IncludedFileExtensions} from "../../../config";
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('FileExtensionValidator', () => {
    let includedFileExtensions: IncludedFileExtensions;
    let fileValidator: FileExtensionValidator;

    it('should construct', () => {
        includedFileExtensions = ['ts'];
        initValidator();

        expect(fileValidator).to.be.instanceof(FileExtensionValidator);
    });

    it('should not validate file path with all incorrect extensions', () => {
        includedFileExtensions = ['ts', 'js', 'xml'];
        initValidator();

        expect(fileValidator.hasCorrectFileExtension('foo-bar.baz')).to.equal(false);
        expect(fileValidator.hasCorrectFileExtension('foo-ts.baz')).to.equal(false);
        expect(fileValidator.hasCorrectFileExtension('foo.ts.baz')).to.equal(false);
    });

    it('should validate file path with one of the correct extension', () => {
        includedFileExtensions = ['js', 'ts'];
        initValidator();

        expect(fileValidator.hasCorrectFileExtension('foo.ts.ts')).to.equal(true);
        expect(fileValidator.hasCorrectFileExtension('foo-baz.ts')).to.equal(true);
        expect(fileValidator.hasCorrectFileExtension('lorem-ipsum-dorem-sorem-oo-baz.ts')).to.equal(true);
    });

    function initValidator() {
        fileValidator = new FileExtensionValidator(includedFileExtensions);
    }

});