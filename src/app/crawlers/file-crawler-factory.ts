import {FileCrawler} from "./file-crawler";
import {TypescriptMethodCountParser} from "./file-parsers/typescript/method-count-parser";
import * as fs from "fs";
import {ILineReader} from "./line-readers/line-reader.interface";

export class FileCrawlerFactory {

    public instantiate(path): FileCrawler {
        const lineReader: ILineReader = require('readline').createInterface({
            input: fs.createReadStream(path)
        });
        const fileCrawler = new FileCrawler(path, lineReader);

        this.initFileParsers(fileCrawler);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler): void {
        fileCrawler.addFileParser(new TypescriptMethodCountParser());
    }
}