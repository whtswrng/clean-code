import {IFileCrawler} from "./file-crawler.interface";
import {IFileParser} from "./file-parsers/file-parser.interface";

export class DummyFileCrawler implements IFileCrawler {

    public addFileParser(fileParser: IFileParser): void {
    }

    public start(): Promise<void> {
        return null;
    }

}

