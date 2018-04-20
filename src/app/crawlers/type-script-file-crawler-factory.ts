import {FileCrawler} from "./file-crawler";
import {LineReader} from "./line-readers/line-reader";
import {TypeScriptLineParser} from "./line-validators/type-script-line-parser";
import {TypescriptClassParser} from "./file-parsers/typescript/class/class-parser";
import {TypeScriptClassReporter} from "./reporters/typescript/type-script-class-reporter";
import {Table} from "./printers/table-printer";
import {TypescriptMethodCounterParser} from "./file-parsers/typescript/class/method-counter/method-counter-parser";
import {TypescriptMethodLineParser} from "./file-parsers/typescript/class/method-line/method-line-parser";
import {TableFormatter} from "./table-formatters/table-formatter";
import {TypescriptClassLineParser} from "./file-parsers/typescript/class/class-line/class-line-parser";
import {TypescriptClassImportCounterParser} from "./file-parsers/typescript/class/class-import-counter/class-import-counter-parser";

export class TypeScriptFileCrawlerFactory {

    private fileReporter: TypeScriptClassReporter;

    constructor(table: Table, tableFormatter: TableFormatter) {
        this.fileReporter = new TypeScriptClassReporter(table, tableFormatter);
    }

    public instantiate(path): FileCrawler {
        const fileCrawler = new FileCrawler(path, new LineReader(path), this.fileReporter);

        this.initFileParsers(fileCrawler);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler): void {
        const lineParser = new TypeScriptLineParser();
        const classParser = new TypescriptClassParser(lineParser, [
            new TypescriptClassLineParser(this.fileReporter, lineParser),
            new TypescriptMethodCounterParser(this.fileReporter, lineParser),
            new TypescriptMethodLineParser(this.fileReporter, lineParser),
        ], this.fileReporter);

        fileCrawler.addFileParser(classParser);
        fileCrawler.addFileParser(new TypescriptClassImportCounterParser(this.fileReporter, lineParser));
    }
}