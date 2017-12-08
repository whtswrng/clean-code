import {IFileParser} from "./file-parsers/file-parser.interface";
import {ILineReader} from "./line-readers/line-reader.interface";

export class FileCrawler {

    private fileParsers: Array<IFileParser> = [];

    constructor(private path: string, private lineReader: ILineReader) {

    }

    public addFileParser(fileParser: IFileParser): void {
        this.fileParsers.push(fileParser);
    }

    public async start(): Promise<void> {
        this.startParsing();
        this.addListenersForFileCrawling();
    }

    private startParsing(): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.start(this.path));
    }

    private addListenersForFileCrawling(): void {
        this.lineReader.addListener('line', (line) => this.readLine(line));
        this.lineReader.addListener('close', () => this.stopLineReading());
    }

    private readLine(line): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.readLine(line));
    }

    private stopLineReading(): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.stop());
    }
}

