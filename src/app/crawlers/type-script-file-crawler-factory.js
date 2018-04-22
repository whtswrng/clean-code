"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_crawler_1 = require("./file-crawler");
const line_reader_1 = require("./line-readers/line-reader");
const type_script_line_parser_1 = require("./line-validators/type-script-line-parser");
const class_parser_1 = require("./file-parsers/typescript/class/class-parser");
const type_script_class_reporter_1 = require("./reporters/typescript/type-script-class-reporter");
const method_counter_parser_1 = require("./file-parsers/typescript/class/method-counter/method-counter-parser");
const method_line_parser_1 = require("./file-parsers/typescript/class/method-line/method-line-parser");
const class_line_parser_1 = require("./file-parsers/typescript/class/class-line/class-line-parser");
const class_import_counter_parser_1 = require("./file-parsers/typescript/class/class-import-counter/class-import-counter-parser");
class TypeScriptFileCrawlerFactory {
    constructor(tableFactory, tableFormatter) {
        this.tableFactory = tableFactory;
        this.tableFormatter = tableFormatter;
    }
    instantiate(path) {
        const fileReporter = new type_script_class_reporter_1.TypeScriptClassReporter(this.tableFactory, this.tableFormatter);
        const fileCrawler = new file_crawler_1.FileCrawler(path, new line_reader_1.LineReader(path), fileReporter);
        this.initFileParsers(fileCrawler, fileReporter);
        return fileCrawler;
    }
    initFileParsers(fileCrawler, fileReporter) {
        const lineParser = new type_script_line_parser_1.TypeScriptLineParser();
        const classParser = new class_parser_1.TypescriptClassParser(lineParser, [
            new class_line_parser_1.TypescriptClassLineParser(fileReporter, lineParser),
            new method_counter_parser_1.TypescriptMethodCounterParser(fileReporter, lineParser),
            new method_line_parser_1.TypescriptMethodLineParser(fileReporter, lineParser),
        ], fileReporter);
        fileCrawler.addFileParser(classParser);
        fileCrawler.addFileParser(new class_import_counter_parser_1.TypescriptClassImportCounterParser(fileReporter, lineParser));
    }
}
exports.TypeScriptFileCrawlerFactory = TypeScriptFileCrawlerFactory;
//# sourceMappingURL=type-script-file-crawler-factory.js.map