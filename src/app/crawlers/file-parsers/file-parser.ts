import {IFileParser} from "./file-parser.interface";
import {LineParser} from "../line-parsers/line-parser";

export class FileParser implements IFileParser {

    protected filePath: string;
    protected lineCount: number = 0;
    protected nestingCount: number = 0;
    private shouldIncrementNestingCount: boolean;

    constructor(protected lineParser: LineParser) {

    }

    public start(filePath: string): void {
        this.filePath = filePath;
    }

    public readLine(line: string): void {
        this.lineCount++;
        this.processNestingCount(line);
        this.determineWhetherIncrementNestingCount(line);
    }

    private determineWhetherIncrementNestingCount(line: string) {
        if (this.lineParser.hasStartBraces(line)) {
            this.shouldIncrementNestingCount = true;
        }
    }

    private processNestingCount(line: string) {
        if (this.shouldIncrementNestingCount) {
            this.nestingCount++;
            this.shouldIncrementNestingCount = false;
        } else if (this.lineParser.hasEndBraces(line)) {
            this.nestingCount--;
        }
    }

    stop(): void {
    }

}