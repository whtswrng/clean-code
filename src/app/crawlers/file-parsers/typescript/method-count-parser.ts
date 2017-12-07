import {IFileParser} from "../file-parser.interface";

export class TypescriptMethodCountParser implements IFileParser{

    public start(path) {
        console.log(`starting parsing file ${path}`);
    }

    public readLine(lineString) {
        console.log(lineString)

    }

    public stop() {
        console.log('stop parsing!');
    }

}