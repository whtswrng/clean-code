import * as sinon from 'sinon';
import {DummyReporter} from "../../../reporters/dummy-reporter";
import {LineValidator} from "../../../line-validators/line-validator";
import {config} from "../../../../../config";
import {IReporter} from "../../../reporters/reporter.interface";
import {REPORTS, TypescriptMethodParametersParser} from "./method-parameters-parser";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Method Parameters Parser", () => {

    let reporter: IReporter;
    let methodParameterParser: TypescriptMethodParametersParser;
    let sandbox;

    beforeEach(async () => {
        sandbox = sinon.sandbox.create();
        reporter = new DummyReporter();
        methodParameterParser = new TypescriptMethodParametersParser(reporter, new LineValidator());
    });

    afterEach(function () {
        sandbox.restore();
    });

    it(`should report that there are function parameter violation`, async () => {
        const reportSpy = sandbox.spy(reporter, 'report');

        methodParameterParser.readLine('public fooBar(fooo, bar, baz, ofof) {');
        methodParameterParser.readLine('public fooBar(fooo: number, bar, baz: string, ofof) {');
        methodParameterParser.readLine('public fooBar(a, b, c, d, e) {');

        sinon.assert.calledThrice(reportSpy);
        sinon.assert.calledWith(reportSpy, REPORTS.FUNCTION_PARAMETERS_EXCEEDED);
    });

});

