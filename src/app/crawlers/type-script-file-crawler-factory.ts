import {FileCrawler} from "./file-crawler";
import {LineReader} from "./line-readers/line-reader";
import {TypeScriptLineParser} from "./line-validators/type-script-line-parser";
import {TypescriptClassParser} from "./file-parsers/typescript/class/class-parser";
import {TypeScriptClassReporter} from "./reporters/typescript/type-script-class-reporter";
import {TypescriptMethodCounterParser} from "./file-parsers/typescript/class/method-counter/method-counter-parser";
import {TypescriptMethodLineParser} from "./file-parsers/typescript/class/method-line/method-line-parser";
import {TableFormatter} from "./table-formatters/table-formatter";
import {TypescriptClassLineParser} from "./file-parsers/typescript/class/class-line/class-line-parser";
import {TypescriptClassImportCounterParser} from "./file-parsers/typescript/class/class-import-counter/class-import-counter-parser";
import {TableFactory} from "./printers/table-factory";

export class TypeScriptFileCrawlerFactory {

    constructor(private tableFactory: TableFactory, private tableFormatter: TableFormatter) {
    }

    public instantiate(path): FileCrawler {
        const fileReporter = new TypeScriptClassReporter(this.tableFactory, this.tableFormatter);
        const fileCrawler = new FileCrawler(path, new LineReader(path), fileReporter);

        this.initFileParsers(fileCrawler, fileReporter);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler, fileReporter): void {
        const lineParser = new TypeScriptLineParser();
        const classParser = new TypescriptClassParser(lineParser, [
            new TypescriptClassLineParser(fileReporter, lineParser),
            new TypescriptMethodCounterParser(fileReporter, lineParser),
            new TypescriptMethodLineParser(fileReporter, lineParser),
        ], fileReporter);

        fileCrawler.addFileParser(classParser);
        fileCrawler.addFileParser(new TypescriptClassImportCounterParser(fileReporter, lineParser));
    }
}