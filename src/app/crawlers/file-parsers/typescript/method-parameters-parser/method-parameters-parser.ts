import {IFileParser} from "../../file-parser.interface";
import {IReporter} from "../../../reporters/reporter.interface";
import {LineValidator} from "../../../line-parsers/line-validator";
import {config} from "../../../../../config";
import {FileParser} from "../../file-parser";

export class TypescriptMethodParametersParser extends FileParser implements IFileParser {

    constructor(private reporter: IReporter, protected lineParser: LineValidator) {
        super(lineParser);
    }

    public readLine(lineString) {
        console.log(lineString)
        super.readLine(lineString);
    }

    public stop() {
    }

}

export const REPORTS = {
    FUNCTION_PARAMETERS_EXCEEDED: `More than ${config.MAX_FUNCTION_PARAMETERS_LENGTH} methods!`
};
