import {IReporter} from "../../../reporters/reporter.interface";
import {TypeScriptLineParser} from "../../../line-validators/type-script-line-parser";
import {config} from "../../../../../config";
import {FileParser} from "../../file-parser";

export class TypescriptMethodParametersParser extends FileParser {

    constructor(private reporter: IReporter, protected lineParser: TypeScriptLineParser) {
        super(lineParser);
    }

    public readLine(line) {
        super.readLine(line);
        if(this.lineParser.hasFunctionDefinition(line) && this.lineParser.hasFunctionMoreThanThreeArguments(line)) {
            this.reporter.report(REPORTS.FUNCTION_PARAMETERS_EXCEEDED, this.filePath, this.lineNumber);
        }
    }

}

export const REPORTS = {
    FUNCTION_PARAMETERS_EXCEEDED: `More than ${config.MAX_FUNCTION_PARAMETERS_LENGTH} methods!`
};
