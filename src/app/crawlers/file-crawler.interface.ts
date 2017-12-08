import {IFileParser} from "./file-parsers/file-parser.interface";

export interface IFileCrawler {
    addFileParser(fileParser: IFileParser): void;
    start(): Promise<void>;
}
