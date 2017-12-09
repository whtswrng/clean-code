import {IFileParser} from "../../file-parser.interface";
import {IReporter} from "../../../reporters/reporter.interface";
import {LineParser} from "../../../line-parsers/line-parser";
import {config} from "../../../../../config";
import {FileParser} from "../../file-parser";

export class TypescriptMethodCountParser extends FileParser implements IFileParser {

    private methodCount: number = 0;

    constructor(private reporter: IReporter, protected lineParser: LineParser) {
        super(lineParser);
    }

    public readLine(lineString) {
        super.readLine(lineString);
        if (this.isNestedInClass() && this.lineParser.hasMethodDefinition(lineString)) {
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
    METHOD_COUNT_EXCEEDED: 'More than 2 methods!'
};