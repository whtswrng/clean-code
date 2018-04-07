import {IReporter} from "../reporter.interface";

export class TypeScriptClassReporter implements IReporter{

    private privateMethodsCount = 0;
    private publicMethodsCount = 0;
    private className: string;

    constructor() {

    }

    public print(): void {
        console.log(`Stats for class ${this.className}`);
        console.log(`Private methods count: ${this.privateMethodsCount}`);
        console.log(`Public methods count: ${this.publicMethodsCount}`);
    }

    public reportPrivateMethod() {
        this.privateMethodsCount++;
    }

    public reportPublicMethod() {
        this.publicMethodsCount++;
    }

    public setClassName(name: string) {
        this.className = name;
    }

}