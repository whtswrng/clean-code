import {IReporter} from "../reporter.interface";
import {Table} from "../../printers/table-printer";
import {TableFormatter} from "../../table-formatters/table-formatter";

export class TypeScriptClassReporter implements IReporter {

    private privateMethodsCount = 0;
    private publicMethodsCount = 0;
    private className: string;
    private methodLineCountList = [];

    constructor(private table: Table, private formatter: TableFormatter) {

    }

    public print(): void {
        this.table.push(
            [this.formatter.formatClassName(this.className), ''],
            [this.formatter.formatName('Private methods'), this.formatter.formatValue(this.privateMethodsCount)],
            [this.formatter.formatName('Public methods'), this.formatter.formatValue(this.publicMethodsCount)],
            [this.formatter.formatName('Methods line count'), '',
                this.formatter.formatAverage(this.calculateAverageLines()),
                this.formatter.formatMax(Math.max(...this.methodLineCountList))
            ]
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

    public addMethodLineCount(count: number): void {
        this.methodLineCountList.push(count);
    }

    private calculateAverageLines(): number {
        let sum = 0;
        this.methodLineCountList.forEach((count) => sum+=count);

        return sum / this.methodLineCountList.length;
    }
}