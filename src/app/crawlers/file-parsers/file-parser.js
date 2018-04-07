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
        this.processNestingCount(line);
        this.determineWhetherIncrementNestingCount(line);
    }
    determineWhetherIncrementNestingCount(line) {
        if (this.lineParser.hasStartBraces(line)) {
            this.shouldIncrementNestingCount = true;
        }
    }
    processNestingCount(line) {
        if (this.shouldIncrementNestingCount) {
            this.nestingCount++;
            this.shouldIncrementNestingCount = false;
        }
        if (this.lineParser.hasEndBraces(line)) {
            this.nestingCount--;
        }
    }
    stop() {
    }
}
exports.FileParser = FileParser;
//# sourceMappingURL=file-parser.js.map