import {IFileParser} from "../../file-parser.interface";
import {IReporter} from "../../../reporters/reporter.interface";

export class TypescriptMethodCountParser implements IFileParser{

    constructor(private reporter: IReporter) {

    }

    public start(path) {
    }

    public readLine(lineString) {
    }

    public stop() {
    }

}

export const REPORTS = {
    MORE_THAN_2_METHODS: 'More thant 2 methods!'
};