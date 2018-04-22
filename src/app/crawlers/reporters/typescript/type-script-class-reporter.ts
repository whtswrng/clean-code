import {IReporter} from "../reporter.interface";
import {FORMAT_LEVEL, TableFormatter} from "../../table-formatters/table-formatter";
import {TableFactory} from "../../printers/table-factory";
import {Table} from "../../printers/table-printer";

export class TypeScriptClassReporter implements IReporter {

    private dependencyCount: number = 0;
    private classLines: number = 0;
    private privateMethodsCount = 0;
    private publicMethodsCount = 0;
    private className: string;
    private methodLineCountList = [];

    constructor(private tableFactory: TableFactory, private formatter: TableFormatter) {

    }

    public print(): void {
        if(this.className) {
            this.createTable();
        }
    }

    private createTable(): void {
        const table = this.tableFactory.instantiate(this.className);

        this.fillTable(table);

        console.log(table.toString());
    }

    private fillTable(table: Table): void {
        table.push(
            [this.formatter.formatName('Class lines count'), this.formatter.formatValue(this.classLines)],
            [this.formatter.formatName('Public methods'), this.formatter.formatValue(this.publicMethodsCount)],
            [this.formatter.formatName('Private methods'), this.formatter.formatValue(this.privateMethodsCount)],
            [this.formatter.formatName('Dependency count'), this.formatter.formatValue(this.dependencyCount)],
            [this.formatter.formatName('Method lines count'), '',
                this.formatter.formatValue(
                    this.getAverageMethodLinesCount(), this.getFormatLevelForAverageMethodLinesCount()
                ),
                this.formatter.formatValue(
                    this.getMaxMethodLinesCount(), this.getFormatLevelForMaxMethodLinesCount()
                )
            ]
        );
    }

    private getFormatLevelForMaxMethodLinesCount(): FORMAT_LEVEL {
        const result = this.getAverageMethodLinesCount();

        if(result >= 8) {
            return FORMAT_LEVEL.STRICT
        } else if(result >= 6) {
            return FORMAT_LEVEL.WARNING;
        } else {
            return FORMAT_LEVEL.OK;
        }
    }

    private getFormatLevelForAverageMethodLinesCount(): FORMAT_LEVEL {
        const result = this.getAverageMethodLinesCount();

        if(result >= 7) {
            return FORMAT_LEVEL.STRICT
        } else if(result >= 5) {
            return FORMAT_LEVEL.WARNING;
        } else {
            return FORMAT_LEVEL.OK;
        }
    }

    private getAverageMethodLinesCount(): number {
        return this.calculateAverageLines() || null;
    }

    private getMaxMethodLinesCount(): number {
        return this.methodLineCountList.length ? Math.max(...this.methodLineCountList) : null;
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