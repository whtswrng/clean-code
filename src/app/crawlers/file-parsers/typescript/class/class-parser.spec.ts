import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import * as chaiAsPromised from 'chai-as-promised';
import {MoreThanOneClassError, TypescriptClassParser} from "./class-parser";
import {TypeScriptLineParser} from "../../../line-validators/type-script-line-parser";
import {IFileParser} from "../../file-parser.interface";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Typescript Class Parser', () => {

    let classParser: TypescriptClassParser;
    let lineParser: TypeScriptLineParser;
    let classParsers: Array<IFileParser>;
    let fileParser: IFileParser;

    beforeEach((() => {
        lineParser = new TypeScriptLineParser();
        fileParser = {
            readLine: sinon.spy(),
            start: sinon.spy()
        };
        classParsers = [fileParser];
        classParser = new TypescriptClassParser(lineParser, classParsers);
        classParser.start('someFile.ts');
    }));


    it('should be properly created', () => {
        expect(classParser).to.be.instanceof(TypescriptClassParser);
    });

    it('should not call start on the file parser if line has no class definition', () => {
        classParser.readLine('some');
        classParser.readLine('garbage');
        classParser.readLine('lines');

        expect(fileParser.start).not.to.have.been.called;
    });

    it('should call start on the file parser if line contains class definition', () => {
        classParser.readLine('blublub');
        classParser.readLine('class Foo {');
        classParser.readLine('bleblelble');

        expect(fileParser.start).to.have.been.calledOnce;
    });

    it('should throw error if line contains more than 1 class definition', () => {
        classParser.readLine('blublub');
        classParser.readLine('class Foo {');
        classParser.readLine('bleblelble');


        expect(() => classParser.readLine('class BlubJojojoWlok {')).to.throw(MoreThanOneClassError);
    });

    it('should read correct line in inner parser if it is in class', () => {
        classParser.readLine('class Fooo {');
        classParser.readLine('fofofo');
        classParser.readLine('blub');
        classParser.readLine('}');

        expect(fileParser.readLine).to.have.been.calledWith('fofofo');
        expect(fileParser.readLine).to.have.been.calledWith('blub');
        expect(fileParser.readLine).to.have.been.calledTwice;
    });

});
