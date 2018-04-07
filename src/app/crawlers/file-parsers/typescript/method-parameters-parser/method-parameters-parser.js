"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../../config");
const file_parser_1 = require("../../file-parser");
class TypescriptMethodParametersParser extends file_parser_1.FileParser {
    constructor(reporter, lineParser) {
        super(lineParser);
        this.reporter = reporter;
        this.lineParser = lineParser;
    }
    readLine(line) {
        super.readLine(line);
        if (this.lineParser.hasFunctionDefinition(line) && this.lineParser.hasFunctionMoreThanThreeArguments(line)) {
            this.reporter.report(exports.REPORTS.FUNCTION_PARAMETERS_EXCEEDED, this.filePath, this.lineNumber);
        }
    }
    stop() {
    }
}
exports.TypescriptMethodParametersParser = TypescriptMethodParametersParser;
exports.REPORTS = {
    FUNCTION_PARAMETERS_EXCEEDED: `More than ${config_1.config.MAX_FUNCTION_PARAMETERS_LENGTH} methods!`
};
//# sourceMappingURL=method-parameters-parser.js.map