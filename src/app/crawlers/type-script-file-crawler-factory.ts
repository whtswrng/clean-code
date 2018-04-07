import {FileCrawler} from "./file-crawler";
import {LineReader} from "./line-readers/line-reader";
import {TypeScriptFileReporter} from "./reporters/reporter";
import {TypeScriptLineParser} from "./line-validators/type-script-line-parser";
import {TypescriptMethodCounterParser} from "./file-parsers/typescript/method-counter/method-counter";

export class TypeScriptFileCrawlerFactory {

    private fileReporter = new TypeScriptFileReporter();

    public instantiate(path): FileCrawler {
        const fileCrawler = new FileCrawler(path, new LineReader(path), this.fileReporter);

        this.initFileParsers(fileCrawler);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler): void {
        const lineParser = new TypeScriptLineParser();

        fileCrawler.addFileParser(new TypescriptMethodCounterParser(this.fileReporter, lineParser));
    }
}