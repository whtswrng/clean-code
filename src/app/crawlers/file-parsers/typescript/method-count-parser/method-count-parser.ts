import {IFileParser} from "../../file-parser.interface";
import {IReporter} from "../../../reporters/reporter.interface";
import {LineValidator} from "../../../line-parsers/line-validator";
import {config} from "../../../../../config";
import {FileParser} from "../../file-parser";

export class TypescriptMethodCountParser extends FileParser implements IFileParser {

    private methodCount: number = 0;

    constructor(private reporter: IReporter, protected lineParser: LineValidator) {
        super(lineParser);
    }

    public readLine(lineString) {
        super.readLine(lineString);
        if (this.isNestedInClass() && this.lineParser.hasFunctionDefinition(lineString)) {
            this.methodCount++;
        }
    }

    public stop() {
        if (this.methodCount > config.MAX_RECOMMENDED_METHODS_PER_CLASS) {
            this.reporter.report(REPORTS.METHOD_COUNT_EXCEEDED, this.filePath);
        }
    }

    private isNestedInClass(): boolean {
        return this.nestingCount === 1;
    }

}

export const REPORTS = {
    METHOD_COUNT_EXCEEDED: `More than ${config.MAX_RECOMMENDED_METHODS_PER_CLASS} methods!`
};