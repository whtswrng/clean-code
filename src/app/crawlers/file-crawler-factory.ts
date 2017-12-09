import {FileCrawler} from "./file-crawler";
import {TypescriptMethodCountParser} from "./file-parsers/typescript/method-count-parser/method-count-parser";
import * as fs from "fs";
import {ILineReader} from "./line-readers/line-reader.interface";
import {LineReader} from "./line-readers/line-reader";
import {Reporter} from "./reporters/reporter";
import {LineParser} from "./line-parsers/line-parser";

export class FileCrawlerFactory {

    public instantiate(path): FileCrawler {
        const fileCrawler = new FileCrawler(path, new LineReader(path));

        this.initFileParsers(fileCrawler);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler): void {
        const reporter = new Reporter();
        const lineParser = new LineParser();

        fileCrawler.addFileParser(new TypescriptMethodCountParser(reporter, lineParser));
    }
}