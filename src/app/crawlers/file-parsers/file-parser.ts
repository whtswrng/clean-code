import {IFileParser} from "./file-parser.interface";
import {TypeScriptLineParser} from "../line-validators/type-script-line-parser";

export class FileParser implements IFileParser {

    protected filePath: string;
    protected lineNumber: number = 0;
    protected nestingCount: number = 0;
    private shouldIncrementNestingCount: boolean;

    constructor(protected lineParser: TypeScriptLineParser) {

    }

    public start(filePath: string): void {
        this.filePath = filePath;
    }

    public readLine(line: string): void {
        this.lineNumber++;
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
        }
        if (this.lineParser.hasEndBraces(line)) {
            this.nestingCount--;
        }
    }

    stop(): void {
    }

}