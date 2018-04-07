import {IReporter} from "./reporter.interface";

export class DummyReporter implements IReporter {

    print(): void {
    }

    public report(msg: string): void {
    }
}