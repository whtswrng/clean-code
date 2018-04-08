import {TableFormatter} from "./table-formatter";

export class BasicTableFormatter implements TableFormatter{

    constructor(private colors: any) {

    }

    public formatClassName(className: string): string {
        return this.colors.bold.underline(className);
    }

    public formatMax(number: number): string {
        return this.colors.bold(number.toString());
    }

    public formatAverage(number: number): string {
        return this.colors.bold(number.toString());
    }

    public formatValue(value: string): string {
        return this.colors.bold(value);
    }

    public formatName(name: string): string {
        return this.colors.bold(name.toString());
    }

}