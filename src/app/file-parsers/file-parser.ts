import {IFileParser} from "./file-parser.interface";
import {TypeScriptLineParser} from "../line-validators/type-script-line-parser";

export class FileParser implements IFileParser {

    protected filePath: string;
    protected lineNumber: number = 0;
    protected nestingCount: number = 0;

    constructor(protected lineParser: TypeScriptLineParser) {

    }

    public start(filePath: string): void {
        this.filePath = filePath;
    }

    public readLine(line: string): void {
        this.lineNumber++;
        this.determineWhetherIncrementNestingCount(line);
        this.determineWhetherDecrementNestingCount(line);
    }

    private determineWhetherIncrementNestingCount(line: string): void {
        if (this.lineParser.countStartBracket(line) > this.lineParser.countEndBracket(line)) {
            this.nestingCount++;
        }
    }

    private determineWhetherDecrementNestingCount(line: string): void {
        if(this.lineParser.countEndBracket(line) > this.lineParser.countStartBracket(line)) {
            this.nestingCount--;
        }
    }

    public stop(): void {
    }

}