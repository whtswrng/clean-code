import * as sinon from 'sinon';
import {DummyReporter} from "../../../reporters/dummy-reporter";
import {LineValidator} from "../../../line-validators/line-validator";
import {config} from "../../../../../config";
import {IReporter} from "../../../reporters/reporter.interface";
import {REPORTS, TypescriptCallbackNestingParser} from "./callback-nesting-parser";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Callback Nesting Parser", () => {

    let reporter: IReporter;
    let callbackNestingParser: TypescriptCallbackNestingParser;
    let sandbox;

    beforeEach(async () => {
        sandbox = sinon.sandbox.create();
        reporter = new DummyReporter();
        callbackNestingParser = new TypescriptCallbackNestingParser(reporter, new LineValidator());
    });

    afterEach(function () {
        sandbox.restore();
    });

    it(`should report that there is callback nesting violation`, async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        const nestingList = [
            'public fooBar(fooo, bar, baz, ofof) {',
            '   foo(bar, () => {',
            '       baz(res => {',
            '           // cb hell',
            '       })',
            '   });',
            '}'
        ];
        nestingList.forEach((line) => callbackNestingParser.readLine(line));

        sinon.assert.calledOnce(reportSpy);
        sinon.assert.calledWith(reportSpy, REPORTS.CALLBACK_NESTING_COUNT_EXCEEDED);
    });

    it(`should not report that there is callback nesting violation`, async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        const nestingList = [
            'public fooBar(fooo, bar, baz, ofof) {',
            '   foo(bar, () => {',
            '   });',
            '}'
        ];
        nestingList.forEach((line) => callbackNestingParser.readLine(line));

        sinon.assert.notCalled(reportSpy);
    });

});

