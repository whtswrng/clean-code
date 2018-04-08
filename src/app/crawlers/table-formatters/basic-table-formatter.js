"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicTableFormatter {
    constructor(colors) {
        this.colors = colors;
    }
    formatClassName(className) {
        return this.colors.bold.underline(className);
    }
    formatMax(number) {
        return this.colors.bold(number.toString());
    }
    formatAverage(number) {
        return this.colors.bold(number.toString());
    }
    formatValue(value) {
        return this.colors.bold(value);
    }
    formatName(name) {
        return this.colors.bold(name.toString());
    }
}
exports.BasicTableFormatter = BasicTableFormatter;
//# sourceMappingURL=basic-table-formatter.js.map