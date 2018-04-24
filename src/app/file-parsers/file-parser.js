"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileParser {
    constructor(lineParser) {
        this.lineParser = lineParser;
        this.lineNumber = 0;
        this.nestingCount = 0;
    }
    start(filePath) {
        this.filePath = filePath;
    }
    readLine(line) {
        this.lineNumber++;
        this.determineWhetherIncrementNestingCount(line);
        this.determineWhetherDecrementNestingCount(line);
    }
    determineWhetherIncrementNestingCount(line) {
        if (this.lineParser.countStartBracket(line) > this.lineParser.countEndBracket(line)) {
            this.nestingCount++;
        }
    }
    determineWhetherDecrementNestingCount(line) {
        if (this.lineParser.countEndBracket(line) > this.lineParser.countStartBracket(line)) {
            this.nestingCount--;
        }
    }
    stop() {
    }
}
exports.FileParser = FileParser;
//# sourceMappingURL=file-parser.js.map