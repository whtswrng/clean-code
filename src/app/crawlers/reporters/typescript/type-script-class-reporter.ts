import {IReporter} from "../reporter.interface";
import {Table} from "../../printers/table-printer";

export class TypeScriptClassReporter implements IReporter {

    private privateMethodsCount = 0;
    private publicMethodsCount = 0;
    private className: string;

    constructor(private table: Table) {

    }

    public print(): void {
        this.table.push(
            {[this.className]: ''},
            [],
            {'Private methods': this.privateMethodsCount},
            {'Public methods': this.publicMethodsCount}
        );
        console.log(this.table.toString());
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