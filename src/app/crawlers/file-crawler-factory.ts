import {FileCrawler} from "./file-crawler";
import {TypescriptMethodCountParser} from "./file-parsers/typescript/method-count-parser";

export class FileCrawlerFactory {

    public instantiate(path): FileCrawler {
        const fileCrawler = new FileCrawler(path);

        this.initFileParsers(fileCrawler);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler): void {
        fileCrawler.addfileParser(new TypescriptMethodCountParser());
    }
}