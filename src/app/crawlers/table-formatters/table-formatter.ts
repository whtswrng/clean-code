export interface TableFormatter {
    formatName(name: string): string;
    formatValue(value: string | number): string;
    formatAverage(number: number): string;
    formatMax(number: number): string;
    formatClassName(className: string): string;
}