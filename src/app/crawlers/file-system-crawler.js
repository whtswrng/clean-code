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
const _ = require("lodash");
class FileSystemCrawler {
    constructor(path, fileCrawlerFactory, fileExtensionValidator, fileDeterminer, directoryCrawler) {
        this.path = path;
        this.fileCrawlerFactory = fileCrawlerFactory;
        this.fileExtensionValidator = fileExtensionValidator;
        this.fileDeterminer = fileDeterminer;
        this.directoryCrawler = directoryCrawler;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.fileDeterminer.isDirectory(this.path)) {
                return this.parseRecursiveFolder(this.path);
            }
            else if (yield this.fileDeterminer.isFile(this.path)) {
                return this.parseFile(this.path);
            }
        });
    }
    parseRecursiveFolder(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.directoryCrawler.recursive(path);
            yield Promise.all(_.map(files, (file) => this.parseFile(file)));
        });
    }
    parseFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fileExtensionValidator.hasCorrectFileExtension(path)) {
                const fileCrawler = this.fileCrawlerFactory.instantiate(path);
                return fileCrawler.start();
            }
        });
    }
}
exports.FileSystemCrawler = FileSystemCrawler;
//# sourceMappingURL=file-system-crawler.js.map