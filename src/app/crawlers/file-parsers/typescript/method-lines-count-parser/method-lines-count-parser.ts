import {IFileParser} from "../../file-parser.interface";
import {IReporter} from "../../../reporters/reporter.interface";
import {LineValidator} from "../../../line-validators/line-validator";
import {config} from "../../../../../config";
import {FileParser} from "../../file-parser";

export class TypescriptMethodLinesCountParser extends FileParser implements IFileParser {

    private startingMethodNestingCount: number;
    private linesOfCode: number;
    private isCounting: boolean;

    constructor(private reporter: IReporter, protected lineValidator: LineValidator) {
        super(lineValidator);
    }

    public readLine(line) {
        super.readLine(line);
        if(! this.isCounting && this.lineValidator.hasFunctionDefinition(line)) {
            this.startCounting();
        }
        if(this.isCounting) {
            this.processCounting();
        }
    }

    private startCounting() {
        this.startingMethodNestingCount = this.nestingCount;
        this.isCounting = true;
        this.linesOfCode = 0;
    }

    private processCounting() {
        this.linesOfCode++;

        if (this.isEndOfFunction() && this.exceededLinesOfCode()) {
            this.reporter.report(REPORTS.METHOD_LINES_COUNT_EXCEEDED, this.filePath, this.lineNumber);
            this.reinitializeCountingState();
        }
    }

    private reinitializeCountingState() {
        this.isCounting = false;
        this.linesOfCode = 0;
    }

    private exceededLinesOfCode() {
        return this.linesOfCode > config.MAX_METHOD_LINES_LENGTH;
    }

    private isEndOfFunction() {
        return this.startingMethodNestingCount === this.nestingCount;
    }

}

export const REPORTS = {
    METHOD_LINES_COUNT_EXCEEDED: `More than ${config.MAX_METHOD_LINES_LENGTH} lines of code in function`
};