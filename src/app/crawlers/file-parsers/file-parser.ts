import {IFileParser} from "./file-parser.interface";

export class FileParser implements IFileParser {

    public filePath: string;
    public lineCount: number = 0;

    start(filePath: string): void {
        this.filePath = filePath;
    }

    readLine(lineString: string): void {
        this.lineCount++;
    }

    stop(): void {
    }

}