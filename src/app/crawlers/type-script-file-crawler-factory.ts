import {FileCrawler} from "./file-crawler";
import {LineReader} from "./line-readers/line-reader";
import {TypeScriptLineParser} from "./line-validators/type-script-line-parser";
import {TypescriptMethodCounterParser} from "./file-parsers/typescript/method-counter/method-counter-parser";
import {TypescriptClassParser} from "./file-parsers/typescript/class/class-parser";
import {TypeScriptClassReporter} from "./reporters/typescript/type-script-class-reporter";
import {Table} from "./printers/table-printer";

export class TypeScriptFileCrawlerFactory {

    private fileReporter: TypeScriptClassReporter;

    constructor(private table: Table) {
        this.fileReporter = new TypeScriptClassReporter(table);
    }

    public instantiate(path): FileCrawler {
        const fileCrawler = new FileCrawler(path, new LineReader(path), this.fileReporter);

        this.initFileParsers(fileCrawler);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler): void {
        const lineParser = new TypeScriptLineParser();
        const classParser = new TypescriptClassParser(lineParser, [
            new TypescriptMethodCounterParser(this.fileReporter, lineParser)
        ], this.fileReporter);

        fileCrawler.addFileParser(classParser);
    }
}