import {TableFactory} from "./table-factory";
import {Table} from "./table-printer";
import {ConstructorOf} from "../../../constructor-of.interface";
import {TableFormatter} from "../table-formatters/table-formatter";

export class CliTableFactory implements TableFactory {

    constructor(private tableFormatter: TableFormatter, private cliTable: ConstructorOf<Table>) {

    }

    public instantiate(className: string): Table {
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