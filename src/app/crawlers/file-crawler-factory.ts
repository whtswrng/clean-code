import {FileCrawler} from "./file-crawler";
import {TypescriptMethodCountParser} from "./file-parsers/typescript/method-count-parser/method-count-parser";
import * as fs from "fs";
import {ILineReader} from "./line-readers/line-reader.interface";
import {LineReader} from "./line-readers/line-reader";

export class FileCrawlerFactory {

    public instantiate(path): FileCrawler {
        const fileCrawler = new FileCrawler(path, new LineReader(path));

        this.initFileParsers(fileCrawler);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler): void {
        fileCrawler.addFileParser(new TypescriptMethodCountParser());
    }
}