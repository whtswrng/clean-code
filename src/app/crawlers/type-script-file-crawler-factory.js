"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_crawler_1 = require("./file-crawler");
const line_reader_1 = require("./line-readers/line-reader");
const reporter_1 = require("./reporters/reporter");
const method_parameters_parser_1 = require("./file-parsers/typescript/method-parameters-parser/method-parameters-parser");
const type_script_line_validator_1 = require("./line-validators/type-script-line-validator");
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
        const lineParser = new type_script_line_validator_1.TypeScriptLineValidator();
        fileCrawler.addFileParser(new method_parameters_parser_1.TypescriptMethodParametersParser(this.fileReporter, lineParser));
    }
}
exports.TypeScriptFileCrawlerFactory = TypeScriptFileCrawlerFactory;
//# sourceMappingURL=type-script-file-crawler-factory.js.map