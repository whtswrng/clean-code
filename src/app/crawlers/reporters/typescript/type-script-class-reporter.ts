import {IReporter} from "../reporter.interface";
import {Table} from "../../printers/table-printer";
import {TableFormatter} from "../../table-formatters/table-formatter";

export class TypeScriptClassReporter implements IReporter {

    private dependencyCount: number = 0;
    private classLines: number = 0;
    private privateMethodsCount = 0;
    private publicMethodsCount = 0;
    private className: string;
    private methodLineCountList = [];

    constructor(private table: Table, private formatter: TableFormatter) {

    }

    public print(): void {
        this.table.push(
            [this.formatter.formatClassName(this.className), ''],
            [this.formatter.formatName('Class lines count'), this.formatter.formatValue(this.classLines)],
            [this.formatter.formatName('Public methods'), this.formatter.formatValue(this.publicMethodsCount)],
            [this.formatter.formatName('Private methods'), this.formatter.formatValue(this.privateMethodsCount)],
            [this.formatter.formatName('Dependency count'), this.formatter.formatValue(this.dependencyCount)],
            [this.formatter.formatName('Method lines count'), '',
                this.formatter.formatAverage(this.calculateAverageLines()),
                this.formatter.formatMax(Math.max(...this.methodLineCountList))
            ]
        );
        console.log(this.table.toString());
    }

    public setClassName(name: string) {
        this.className = name;
    }

    public reportClassLines(lines: number): void {
        this.classLines = lines;
    }

    public reportPrivateMethod() {
        this.privateMethodsCount++;
    }

    public reportPublicMethod() {
        this.publicMethodsCount++;
    }

    public reportDependencyCount(count: number): void {
        this.dependencyCount = count;
    }

    public reportMethodLineCount(count: number): void {
        this.methodLineCountList.push(count);
    }

    private calculateAverageLines(): number {
        let sum = 0;
        this.methodLineCountList.forEach((count) => sum+=count);

        return sum / this.methodLineCountList.length;
    }
}