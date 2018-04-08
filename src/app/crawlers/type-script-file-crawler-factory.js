"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_crawler_1 = require("./file-crawler");
const line_reader_1 = require("./line-readers/line-reader");
const type_script_line_parser_1 = require("./line-validators/type-script-line-parser");
const class_parser_1 = require("./file-parsers/typescript/class/class-parser");
const type_script_class_reporter_1 = require("./reporters/typescript/type-script-class-reporter");
const method_counter_parser_1 = require("./file-parsers/typescript/class/method-counter/method-counter-parser");
const method_line_parser_1 = require("./file-parsers/typescript/class/method-line/method-line-parser");
class TypeScriptFileCrawlerFactory {
    constructor(table, tableFormatter) {
        this.fileReporter = new type_script_class_reporter_1.TypeScriptClassReporter(table, tableFormatter);
    }
    instantiate(path) {
        const fileCrawler = new file_crawler_1.FileCrawler(path, new line_reader_1.LineReader(path), this.fileReporter);
        this.initFileParsers(fileCrawler);
        return fileCrawler;
    }
    initFileParsers(fileCrawler) {
        const lineParser = new type_script_line_parser_1.TypeScriptLineParser();
        const classParser = new class_parser_1.TypescriptClassParser(lineParser, [
            new method_counter_parser_1.TypescriptMethodCounterParser(this.fileReporter, lineParser),
            new method_line_parser_1.TypescriptMethodLineParser(this.fileReporter, lineParser)
        ], this.fileReporter);
        fileCrawler.addFileParser(classParser);
    }
}
exports.TypeScriptFileCrawlerFactory = TypeScriptFileCrawlerFactory;
//# sourceMappingURL=type-script-file-crawler-factory.js.map