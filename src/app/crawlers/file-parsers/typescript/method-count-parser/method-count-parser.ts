import {IFileParser} from "../../file-parser.interface";
import {IReporter} from "../../../reporters/reporter.interface";
import {LineParser} from "../../../line-parsers/line-parser";
import {config} from "../../../../../config";

export class TypescriptMethodCountParser implements IFileParser{

    private methodCount: number = 0;

    constructor(private reporter: IReporter, private lineParser: LineParser) {

    }

    public start(path) {
    }

    public readLine(lineString) {
        if(this.lineParser.hasMethodDefinition(lineString)) {
            this.methodCount++;
        }
    }

    public stop() {
        if(this.methodCount > config.MAX_RECOMMENDED_METHODS_PER_CLASS) {
            this.reporter.report(REPORTS.METHOD_COUNT_EXCEEDED);
        }
    }

}

export const REPORTS = {
    METHOD_COUNT_EXCEEDED: 'More than 2 methods!'
};