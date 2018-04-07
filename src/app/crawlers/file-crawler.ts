import {IFileParser} from "./file-parsers/file-parser.interface";
import {ILineReader} from "./line-readers/line-reader.interface";
import {IReporter} from "./reporters/reporter.interface";

export class FileCrawler {

    private fileParsers: Array<IFileParser> = [];

    constructor(private path: string, private lineReader: ILineReader, private reporter: IReporter) {

    }

    public addFileParser(fileParser: IFileParser): void {
        this.fileParsers.push(fileParser);
    }

    public async start(): Promise<any> {
        return new Promise((resolve) => {
            this.startParsing();
            this.addListenersForFileCrawling(resolve);
        });
    }

    private startParsing(): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.start(this.path));
    }

    private addListenersForFileCrawling(resolve): void {
        this.lineReader.addListener('line', (line) => this.readLine(line));
        this.lineReader.addListener('close', () => this.stopLineReading(resolve));
    }

    private readLine(line): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.readLine(line));
    }

    private stopLineReading(resolve): void {
        this.reporter.print();
        resolve();
    }
}

