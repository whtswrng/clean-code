"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_crawler_1 = require("../file-crawler");
const line_reader_1 = require("../line-readers/line-reader");
function prepareFileForCrawling(fileParser, path) {
    const fileCrawler = new file_crawler_1.FileCrawler(path, new line_reader_1.LineReader(path));
    fileCrawler.addFileParser(fileParser);
    return fileCrawler;
}
exports.prepareFileForCrawling = prepareFileForCrawling;
//# sourceMappingURL=helpers.js.map