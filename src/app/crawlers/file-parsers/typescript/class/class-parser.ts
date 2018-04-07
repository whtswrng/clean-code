import {TypeScriptLineParser} from "../../../line-validators/type-script-line-parser";
import {FileParser} from "../../file-parser";
import {IFileParser} from "../../file-parser.interface";

export class TypescriptClassParser extends FileParser {

    private isProcessingClass = false;
    private processingFinished = false;

    constructor(protected lineParser: TypeScriptLineParser, private classParsers: Array<IFileParser>) {
        super(lineParser);
    }

    public readLine(line) {
        super.readLine(line);
        this.processEndOfClass(line);
        this.processLineIfNecessary(line);
        this.checkWhetherLineContainsClass(line);
    }

    private processEndOfClass(line: string): void {
        if(this.isProcessingClass && this.isEndOfTheClass(line)) {
            this.processingFinished = true;
        }

    }

    private isEndOfTheClass(line: string): boolean {
        return this.lineParser.hasEndBracket(line) && this.nestingCount === 0;
    }

    private processLineIfNecessary(line): void {
        if (this.isProcessingClass && ! this.processingFinished) {
            this.propagateLineToAllParsers(line);
        }
    }

    private checkWhetherLineContainsClass(line) {
        if (this.lineParser.hasClassDefinition(line)) {
            this.startClassProcessing();
        }
    }

    private startClassProcessing() {
        if (this.isProcessingClass) {
            throw new MoreThanOneClassError('2 classes in 1 file are not allowed!');
        } else {
            this.classParsers.forEach((classParser) => classParser.start(this.filePath));
            this.isProcessingClass = true;
        }
    }

    private propagateLineToAllParsers(line) {
        this.classParsers.forEach((classParser) => classParser.readLine(line));
    }
}

export class MoreThanOneClassError extends Error {

}
