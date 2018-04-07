"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../../config");
const file_parser_1 = require("../../file-parser");
class TypescriptMethodCountParser extends file_parser_1.FileParser {
    constructor(reporter, lineParser) {
        super(lineParser);
        this.reporter = reporter;
        this.lineParser = lineParser;
        this.methodCount = 0;
    }
    readLine(lineString) {
        super.readLine(lineString);
        if (this.isNestedInClass() && this.lineParser.hasFunctionDefinition(lineString)) {
            this.methodCount++;
        }
    }
    stop() {
        if (this.methodCount > config_1.config.MAX_RECOMMENDED_METHODS_PER_CLASS) {
            this.reporter.report(exports.REPORTS.METHOD_COUNT_EXCEEDED, this.filePath);
        }
    }
    isNestedInClass() {
        return this.nestingCount === 1;
    }
}
exports.TypescriptMethodCountParser = TypescriptMethodCountParser;
exports.REPORTS = {
    METHOD_COUNT_EXCEEDED: `More than ${config_1.config.MAX_RECOMMENDED_METHODS_PER_CLASS} methods!`
};
//# sourceMappingURL=method-count-parser.js.map