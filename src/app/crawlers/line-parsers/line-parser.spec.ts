import * as sinon from 'sinon';
import {LineParser} from "./line-parser";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('Line Parser', () => {

    const lineParser = new LineParser();

    it('should recognize method definition', () => {
        expect(lineParser.hasMethodDefinition('private foo() {')).to.eq(true);
        expect(lineParser.hasMethodDefinition('public foo() {')).to.eq(true);
        expect(lineParser.hasMethodDefinition('foo(): void {')).to.eq(true);
        expect(lineParser.hasMethodDefinition('private fooBar(): So {')).to.eq(true);
        expect(lineParser.hasMethodDefinition('private fooBar(): Some<thing> {')).to.eq(true);
    });

    it('should recognize nesting starting braces', () => {
        expect(lineParser.hasStartBraces('if () {')).to.eq(true);
    });

    it('should recognize nesting ending braces', () => {
        expect(lineParser.hasEndBraces('};')).to.eq(true);
        expect(lineParser.hasEndBraces('}')).to.eq(true);
        expect(lineParser.hasEndBraces('{};')).to.eq(true);
    });

});