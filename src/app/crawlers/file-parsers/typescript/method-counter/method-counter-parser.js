"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../../config");
const file_parser_1 = require("../../file-parser");
class TypescriptMethodCounterParser extends file_parser_1.FileParser {
    constructor(reporter, lineParser) {
        super(lineParser);
        this.reporter = reporter;
        this.lineParser = lineParser;
    }
    readLine(line) {
        super.readLine(line);
        console.log(line);
    }
}
exports.TypescriptMethodCounterParser = TypescriptMethodCounterParser;
exports.REPORTS = {
    FUNCTION_PARAMETERS_EXCEEDED: `More than ${config_1.config.MAX_FUNCTION_PARAMETERS_LENGTH} methods!`
};
//# sourceMappingURL=method-counter-parser.js.map