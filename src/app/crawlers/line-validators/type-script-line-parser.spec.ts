import {TypeScriptLineParser} from "./type-script-line-parser";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('Type Script Line Parser', () => {

    const lineParser = new TypeScriptLineParser();

    it('should recognize method definition', () => {
        expect(lineParser.hasFunctionDefinition('private foo() {')).to.eq(true);
        expect(lineParser.hasFunctionDefinition('public foo() {')).to.eq(true);
        expect(lineParser.hasFunctionDefinition('foo(): void {')).to.eq(true);
        expect(lineParser.hasFunctionDefinition('private fooBar(): So {')).to.eq(true);
        expect(lineParser.hasFunctionDefinition('private fooBar(): Some<thing> {')).to.eq(true);
        expect(lineParser.hasFunctionDefinition('public fooBar(fooo, bar, baz, ofof) {')).to.eq(true);
        expect(lineParser.hasFunctionDefinition('public fooBar(fooo:number, bar: string) {')).to.eq(true);
    });

    it('should recognize nesting starting braces', () => {
        expect(lineParser.hasStartBraces('if () {')).to.eq(true);
        expect(lineParser.hasStartBraces('{};')).to.eq(true);
    });

    it('should recognize nesting ending braces', () => {
        expect(lineParser.hasEndBracket('};')).to.eq(true);
        expect(lineParser.hasEndBracket('}')).to.eq(true);
        expect(lineParser.hasEndBracket('{};')).to.eq(true);
    });

    it('should recognize more than 3 argument in function', () => {
        expect(lineParser.hasFunctionMoreThanThreeArguments('function foo(fafa, fo, fafa, addsa)')).to.eq(true);
        expect(lineParser.hasFunctionMoreThanThreeArguments('function foo(fafa, fo, fafa, addsa, fofofo)')).to.eq(true);
        expect(lineParser.hasFunctionMoreThanThreeArguments('function foo(fafa: string, fo, fafa, addsa: number)')).to.eq(true);
        expect(lineParser.hasFunctionMoreThanThreeArguments('function foo(fafa, fo, fafa)')).to.eq(false);
        expect(lineParser.hasFunctionMoreThanThreeArguments('function foo()')).to.eq(false);
    });

    it('should recognize ES6 callback', () => {
        expect(lineParser.hasES6CallBack('function foo(fafa, () => {')).to.eq(true);
        expect(lineParser.hasES6CallBack('function foo(fafa, foo =>{')).to.eq(true);
        expect(lineParser.hasES6CallBack('faa(() => {')).to.eq(true);

        expect(lineParser.hasES6CallBack('faa(() => 4')).to.eq(false);
        expect(lineParser.hasES6CallBack('faa(fofo => 4')).to.eq(false);
        expect(lineParser.hasES6CallBack('faa(function() {')).to.eq(false);
    });

});