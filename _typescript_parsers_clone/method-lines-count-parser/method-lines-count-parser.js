"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../../config");
const file_parser_1 = require("../../file-parser");
class TypescriptMethodLinesCountParser extends file_parser_1.FileParser {
    constructor(reporter, lineValidator) {
        super(lineValidator);
        this.reporter = reporter;
        this.lineValidator = lineValidator;
    }
    readLine(line) {
        super.readLine(line);
        if (!this.isCounting && this.lineValidator.hasFunctionDefinition(line)) {
            this.startCounting();
        }
        if (this.isCounting) {
            this.processCounting();
        }
    }
    startCounting() {
        this.startingMethodNestingCount = this.nestingCount;
        this.isCounting = true;
        this.linesOfCode = 0;
    }
    processCounting() {
        this.linesOfCode++;
        if (this.isEndOfFunction() && this.exceededLinesOfCode()) {
            this.reporter.report(exports.REPORTS.METHOD_LINES_COUNT_EXCEEDED, this.filePath, this.lineNumber);
            this.reinitializeCountingState();
        }
    }
    reinitializeCountingState() {
        this.isCounting = false;
        this.linesOfCode = 0;
    }
    exceededLinesOfCode() {
        return this.linesOfCode > config_1.config.MAX_METHOD_LINES_LENGTH;
    }
    isEndOfFunction() {
        return this.startingMethodNestingCount === this.nestingCount;
    }
}
exports.TypescriptMethodLinesCountParser = TypescriptMethodLinesCountParser;
exports.REPORTS = {
    METHOD_LINES_COUNT_EXCEEDED: `More than ${config_1.config.MAX_METHOD_LINES_LENGTH} lines of code in function`
};
//# sourceMappingURL=method-lines-count-parser.js.map