"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_parser_1 = require("../../file-parser");
class TypescriptClassParser extends file_parser_1.FileParser {
    constructor(lineParser, classParsers) {
        super(lineParser);
        this.lineParser = lineParser;
        this.classParsers = classParsers;
        this.isProcessingClass = false;
        this.processingFinished = false;
    }
    readLine(line) {
        super.readLine(line);
        this.processEndOfClass(line);
        this.processLineIfNecessary(line);
        this.checkWhetherLineContainsClass(line);
    }
    processEndOfClass(line) {
        if (this.isProcessingClass && this.isEndOfTheClass(line)) {
            this.processingFinished = true;
        }
    }
    isEndOfTheClass(line) {
        return this.lineParser.hasEndBracket(line) && this.nestingCount === 0;
    }
    processLineIfNecessary(line) {
        if (this.isProcessingClass && !this.processingFinished) {
            this.propagateLineToAllParsers(line);
        }
    }
    checkWhetherLineContainsClass(line) {
        if (this.lineParser.hasClassDefinition(line)) {
            this.startClassProcessing();
        }
    }
    startClassProcessing() {
        if (this.isProcessingClass) {
            throw new MoreThanOneClassError('2 classes in 1 file are not allowed!');
        }
        else {
            this.classParsers.forEach((classParser) => classParser.start(this.filePath));
            this.isProcessingClass = true;
        }
    }
    propagateLineToAllParsers(line) {
        this.classParsers.forEach((classParser) => classParser.readLine(line));
    }
}
exports.TypescriptClassParser = TypescriptClassParser;
class MoreThanOneClassError extends Error {
}
exports.MoreThanOneClassError = MoreThanOneClassError;
//# sourceMappingURL=class-parser.js.map