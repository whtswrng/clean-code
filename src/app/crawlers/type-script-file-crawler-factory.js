"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_crawler_1 = require("./file-crawler");
const line_reader_1 = require("./line-readers/line-reader");
const reporter_1 = require("./reporters/reporter");
const type_script_line_parser_1 = require("./line-validators/type-script-line-parser");
const method_counter_parser_1 = require("./file-parsers/typescript/method-counter/method-counter-parser");
const class_parser_1 = require("./file-parsers/typescript/class/class-parser");
class TypeScriptFileCrawlerFactory {
    constructor() {
        this.fileReporter = new reporter_1.TypeScriptFileReporter();
    }
    instantiate(path) {
        const fileCrawler = new file_crawler_1.FileCrawler(path, new line_reader_1.LineReader(path), this.fileReporter);
        this.initFileParsers(fileCrawler);
        return fileCrawler;
    }
    initFileParsers(fileCrawler) {
        const lineParser = new type_script_line_parser_1.TypeScriptLineParser();
        const classParser = new class_parser_1.TypescriptClassParser(lineParser, [
            new method_counter_parser_1.TypescriptMethodCounterParser(this.fileReporter, lineParser)
        ]);
        fileCrawler.addFileParser(classParser);
    }
}
exports.TypeScriptFileCrawlerFactory = TypeScriptFileCrawlerFactory;
//# sourceMappingURL=type-script-file-crawler-factory.js.map