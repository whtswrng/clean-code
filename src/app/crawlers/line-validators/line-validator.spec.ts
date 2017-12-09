import {LineValidator} from "./line-validator";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('Line Validator', () => {

    const lineValidator = new LineValidator();

    it('should recognize method definition', () => {
        expect(lineValidator.hasFunctionDefinition('private foo() {')).to.eq(true);
        expect(lineValidator.hasFunctionDefinition('public foo() {')).to.eq(true);
        expect(lineValidator.hasFunctionDefinition('foo(): void {')).to.eq(true);
        expect(lineValidator.hasFunctionDefinition('private fooBar(): So {')).to.eq(true);
        expect(lineValidator.hasFunctionDefinition('private fooBar(): Some<thing> {')).to.eq(true);
        expect(lineValidator.hasFunctionDefinition('public fooBar(fooo, bar, baz, ofof) {')).to.eq(true);
        expect(lineValidator.hasFunctionDefinition('public fooBar(fooo:number, bar: string) {')).to.eq(true);
    });

    it('should recognize nesting starting braces', () => {
        expect(lineValidator.hasStartBraces('if () {')).to.eq(true);
        expect(lineValidator.hasStartBraces('{};')).to.eq(true);
    });

    it('should recognize nesting ending braces', () => {
        expect(lineValidator.hasEndBraces('};')).to.eq(true);
        expect(lineValidator.hasEndBraces('}')).to.eq(true);
        expect(lineValidator.hasEndBraces('{};')).to.eq(true);
    });

    it('should recognize more than 3 argument in function', () => {
        expect(lineValidator.hasFunctionMoreThanThreeArguments('function foo(fafa, fo, fafa, addsa)')).to.eq(true);
        expect(lineValidator.hasFunctionMoreThanThreeArguments('function foo(fafa, fo, fafa, addsa, fofofo)')).to.eq(true);
        expect(lineValidator.hasFunctionMoreThanThreeArguments('function foo(fafa: string, fo, fafa, addsa: number)')).to.eq(true);
        expect(lineValidator.hasFunctionMoreThanThreeArguments('function foo(fafa, fo, fafa)')).to.eq(false);
        expect(lineValidator.hasFunctionMoreThanThreeArguments('function foo()')).to.eq(false);
    });

});