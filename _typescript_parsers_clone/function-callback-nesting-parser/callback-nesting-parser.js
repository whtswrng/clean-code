"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../../config");
const file_parser_1 = require("../../file-parser");
class TypescriptCallbackNestingParser extends file_parser_1.FileParser {
    constructor(reporter, lineValidator) {
        super(lineValidator);
        this.reporter = reporter;
        this.lineValidator = lineValidator;
        this.callbackNesting = null;
    }
    readLine(line) {
        super.readLine(line);
        if (this.lineValidator.hasES6CallBack(line)) {
            this.processCallbackCount();
        }
    }
    stop() {
    }
    processCallbackCount() {
        if (!this.callbackNesting) {
            this.callbackNesting = {
                callbackCount: 1,
                startedNestingCount: this.nestingCount,
                nestingCount: this.nestingCount
            };
        }
        else {
            this.callbackNesting.callbackCount++;
            this.callbackNesting.nestingCount++;
            if (this.callbackNesting.callbackCount >= config_1.config.MAX_CALLBACK_NESTING_COUNT) {
                this.reporter.report(exports.REPORTS.CALLBACK_NESTING_COUNT_EXCEEDED, this.filePath, this.lineNumber);
            }
        }
        this.callbackNesting.callbackCount++;
    }
}
exports.TypescriptCallbackNestingParser = TypescriptCallbackNestingParser;
exports.REPORTS = {
    CALLBACK_NESTING_COUNT_EXCEEDED: `Callback nesting problem, ${config_1.config.MAX_CALLBACK_NESTING_COUNT} callbacks!!`
};
//# sourceMappingURL=callback-nesting-parser.js.map