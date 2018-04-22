"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_formatter_1 = require("../../table-formatters/table-formatter");
class TypeScriptClassReporter {
    constructor(tableFactory, formatter) {
        this.tableFactory = tableFactory;
        this.formatter = formatter;
        this.dependencyCount = 0;
        this.classLines = 0;
        this.privateMethodsCount = 0;
        this.publicMethodsCount = 0;
        this.methodLineCountList = [];
    }
    print() {
        if (this.className) {
            this.createTable();
        }
    }
    createTable() {
        const table = this.tableFactory.instantiate(this.className);
        this.fillTable(table);
        console.log(table.toString());
    }
    fillTable(table) {
        table.push([this.formatter.formatName('Class lines count'), this.formatter.formatValue(this.classLines)], [this.formatter.formatName('Public methods'), this.formatter.formatValue(this.publicMethodsCount)], [this.formatter.formatName('Private methods'), this.formatter.formatValue(this.privateMethodsCount)], [this.formatter.formatName('Dependency count'), this.formatter.formatValue(this.dependencyCount)], [this.formatter.formatName('Method lines count'), '',
            this.formatter.formatValue(this.getAverageMethodLinesCount(), this.getFormatLevelForAverageMethodLinesCount()),
            this.formatter.formatValue(this.getMaxMethodLinesCount(), this.getFormatLevelForMaxMethodLinesCount())
        ]);
    }
    getFormatLevelForMaxMethodLinesCount() {
        const result = this.getAverageMethodLinesCount();
        if (result >= 8) {
            return table_formatter_1.FORMAT_LEVEL.STRICT;
        }
        else if (result >= 6) {
            return table_formatter_1.FORMAT_LEVEL.WARNING;
        }
        else {
            return table_formatter_1.FORMAT_LEVEL.OK;
        }
    }
    getFormatLevelForAverageMethodLinesCount() {
        const result = this.getAverageMethodLinesCount();
        if (result >= 7) {
            return table_formatter_1.FORMAT_LEVEL.STRICT;
        }
        else if (result >= 5) {
            return table_formatter_1.FORMAT_LEVEL.WARNING;
        }
        else {
            return table_formatter_1.FORMAT_LEVEL.OK;
        }
    }
    getAverageMethodLinesCount() {
        return this.calculateAverageLines() || null;
    }
    getMaxMethodLinesCount() {
        return this.methodLineCountList.length ? Math.max(...this.methodLineCountList) : null;
    }
    setClassName(name) {
        this.className = name;
    }
    reportClassLines(lines) {
        this.classLines = lines;
    }
    reportPrivateMethod() {
        this.privateMethodsCount++;
    }
    reportPublicMethod() {
        this.publicMethodsCount++;
    }
    reportDependencyCount(count) {
        this.dependencyCount = count;
    }
    reportMethodLineCount(count) {
        this.methodLineCountList.push(count);
    }
    calculateAverageLines() {
        let sum = 0;
        this.methodLineCountList.forEach((count) => sum += count);
        return sum / this.methodLineCountList.length;
    }
}
exports.TypeScriptClassReporter = TypeScriptClassReporter;
//# sourceMappingURL=type-script-class-reporter.js.map