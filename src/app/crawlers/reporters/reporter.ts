import {IReporter} from "./reporter.interface";

export class TypeScriptFileReporter implements IReporter {

    public print(): void {
    }

    public report(msg: string, path: string, lineNumber: number): void {
        console.log(`${msg} in path "${path}${this.printLineNumber(lineNumber)}"`);
    }

    private printLineNumber(lineNumber) {
        return lineNumber ? `:${lineNumber}` : '';
    }
}