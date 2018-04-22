import {Table} from "./table-printer";

export interface TableFactory {
    instantiate(className: string): Table;
}