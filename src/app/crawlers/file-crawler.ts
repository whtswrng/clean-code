import * as fs from "fs";
import {IFileParser} from "./file-parsers/file-parser.interface";

export class FileCrawler {

    private fileParsers: Array<IFileParser> = [];

    constructor(private path: string) {

    }

    public addfileParser(fileParser: IFileParser): void {
        this.fileParsers.push(fileParser);
    }

    public async start(): Promise<void> {
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(this.path)
        });
        this.startParsing();
        this.addListenersForFileCrawling(lineReader);
    }

    private startParsing(): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.start(this.path));
    }

    private addListenersForFileCrawling(lineReader): void {
        lineReader.addListener('line', (line) => this.readLine(line));
        lineReader.addListener('close', () => this.stopLineReading());
    }

    private readLine(line): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.readLine(line));
    }

    private stopLineReading(): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.stop());
    }

