"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FileCrawler {
    constructor(path, lineReader, reporter) {
        this.path = path;
        this.lineReader = lineReader;
        this.reporter = reporter;
        this.fileParsers = [];
    }
    addFileParser(fileParser) {
        this.fileParsers.push(fileParser);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.startParsing();
                this.addListenersForFileCrawling(resolve);
            });
        });
    }
    startParsing() {
        this.fileParsers.forEach((fileParser) => fileParser.start(this.path));
    }
    addListenersForFileCrawling(resolve) {
        this.lineReader.addListener('line', (line) => this.readLine(line));
        this.lineReader.addListener('close', () => this.stopLineReading(resolve));
    }
    readLine(line) {
        this.fileParsers.forEach((fileParser) => fileParser.readLine(line));
    }
    stopLineReading(resolve) {
        this.fileParsers.forEach((fileParser) => fileParser.stop());
        this.reporter.print();
        resolve();
    }
}
exports.FileCrawler = FileCrawler;
//# sourceMappingURL=file-crawler.js.map