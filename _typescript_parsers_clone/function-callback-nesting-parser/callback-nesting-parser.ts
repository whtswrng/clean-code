import {IFileParser} from "../../file-parser.interface";
import {IReporter} from "../../../reporters/reporter.interface";
import {LineValidator} from "../../../line-validators/line-validator";
import {config} from "../../../../../config";
import {FileParser} from "../../file-parser";

interface Nesting {
    callbackCount: number;
    startedNestingCount: number;
    nestingCount: number;
}

export class TypescriptCallbackNestingParser extends FileParser implements IFileParser {

    private callbackNesting: Nesting = null;

    constructor(private reporter: IReporter, protected lineValidator: LineValidator) {
        super(lineValidator);
    }

    public readLine(line) {
        super.readLine(line);
        if(this.lineValidator.hasES6CallBack(line)) {
            this.processCallbackCount();
        }
    }

    public stop() {
    }

    private processCallbackCount() {
        if ( ! this.callbackNesting) {
            this.callbackNesting = {
                callbackCount: 1,
                startedNestingCount: this.nestingCount,
                nestingCount: this.nestingCount
            };
        } else {
            this.callbackNesting.callbackCount++;
            this.callbackNesting.nestingCount++;
            if(this.callbackNesting.callbackCount >= config.MAX_CALLBACK_NESTING_COUNT) {
                this.reporter.report(REPORTS.CALLBACK_NESTING_COUNT_EXCEEDED, this.filePath, this.lineNumber);
            }
        }
        this.callbackNesting.callbackCount++;
    }

}

export const REPORTS = {
    CALLBACK_NESTING_COUNT_EXCEEDED: `Callback nesting problem, ${config.MAX_CALLBACK_NESTING_COUNT} callbacks!!`
};
