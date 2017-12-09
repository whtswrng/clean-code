import {IFileParser} from "../../file-parser.interface";
import {IReporter} from "../../../reporters/reporter.interface";
import {LineValidator} from "../../../line-validators/line-validator";
import {config} from "../../../../../config";
import {FileParser} from "../../file-parser";

export class TypescriptMethodParametersParser extends FileParser implements IFileParser {

    constructor(private reporter: IReporter, protected lineValidator: LineValidator) {
        super(lineValidator);
    }

    public readLine(line) {
        super.readLine(line);
        if(this.lineValidator.hasFunctionDefinition(line) && this.lineValidator.hasFunctionMoreThanThreeArguments(line)) {
            this.reporter.report(REPORTS.FUNCTION_PARAMETERS_EXCEEDED, this.filePath, this.lineNumber);
        }
    }

    public stop() {
    }

}

export const REPORTS = {
    FUNCTION_PARAMETERS_EXCEEDED: `More than ${config.MAX_FUNCTION_PARAMETERS_LENGTH} methods!`
};
