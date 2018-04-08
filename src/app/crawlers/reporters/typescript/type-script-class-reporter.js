"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeScriptClassReporter {
    constructor(table) {
        this.table = table;
        this.privateMethodsCount = 0;
        this.publicMethodsCount = 0;
    }
    print() {
        this.table.push({ [this.className]: '' }, [], { 'Private methods': this.privateMethodsCount }, { 'Public methods': this.publicMethodsCount });
        console.log(this.table.toString());
    }
    reportPrivateMethod() {
        this.privateMethodsCount++;
    }
    reportPublicMethod() {
        this.publicMethodsCount++;
    }
    setClassName(name) {
        this.className = name;
    }
}
exports.TypeScriptClassReporter = TypeScriptClassReporter;
//# sourceMappingURL=type-script-class-reporter.js.map