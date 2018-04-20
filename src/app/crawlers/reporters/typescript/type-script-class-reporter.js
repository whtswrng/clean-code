"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeScriptClassReporter {
    constructor(table, formatter) {
        this.table = table;
        this.formatter = formatter;
        this.dependencyCount = 0;
        this.classLines = 0;
        this.privateMethodsCount = 0;
        this.publicMethodsCount = 0;
        this.methodLineCountList = [];
    }
    print() {
        this.table.push([this.formatter.formatClassName(this.className), ''], [this.formatter.formatName('Class lines count'), this.formatter.formatValue(this.classLines)], [this.formatter.formatName('Public methods'), this.formatter.formatValue(this.publicMethodsCount)], [this.formatter.formatName('Private methods'), this.formatter.formatValue(this.privateMethodsCount)], [this.formatter.formatName('Dependency count'), this.formatter.formatValue(this.dependencyCount)], [this.formatter.formatName('Method lines count'), '',
            this.formatter.formatAverage(this.calculateAverageLines()),
            this.formatter.formatMax(Math.max(...this.methodLineCountList))
        ]);
        console.log(this.table.toString());
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