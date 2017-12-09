export interface IReporter {
    report(msg: string, path: string, lineNumber?: number): void
}