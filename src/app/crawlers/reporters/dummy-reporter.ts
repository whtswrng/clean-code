import {IReporter} from "./reporter.interface";

export class DummyReporter implements IReporter {

    public report(msg: string): void {
    }
}