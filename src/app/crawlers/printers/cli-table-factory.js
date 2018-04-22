"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CliTableFactory {
    constructor(tableFormatter, cliTable) {
        this.tableFormatter = tableFormatter;
        this.cliTable = cliTable;
    }
    instantiate(className) {
        return new this.cliTable({
            head: [
                this.tableFormatter.formatClassName(className),
                this.tableFormatter.formatHeaderValue('Value'),
                this.tableFormatter.formatHeaderValue('Average'),
                this.tableFormatter.formatHeaderValue('Max')
            ]
        });
    }
}
exports.CliTableFactory = CliTableFactory;
//# sourceMappingURL=cli-table-factory.js.map