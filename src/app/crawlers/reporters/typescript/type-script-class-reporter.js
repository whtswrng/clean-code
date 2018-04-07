"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeScriptClassReporter {
    constructor() {
        this.privateMethodsCount = 0;
        this.publicMethodsCount = 0;
    }
    print() {
        console.log(`Stats for class ${this.className}`);
        console.log(`Private methods count: ${this.privateMethodsCount}`);
        console.log(`Public methods count: ${this.publicMethodsCount}`);
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