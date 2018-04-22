import {IFileCrawler} from "./file-crawler.interface";
import {IFileParser} from "../file-parsers/file-parser.interface";

export class DummyFileCrawler implements IFileCrawler {


    getScore(): number {
        return null;
    }

    printReport(): void {
    }

    public addFileParser(fileParser: IFileParser): void {
    }

    public process(): Promise<void> {
        return null;
    }

}

