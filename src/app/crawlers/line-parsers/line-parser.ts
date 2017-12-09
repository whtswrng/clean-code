export const METHOD_START_REGEXP = /([a-zA-Z]\w+)\(\).*{/g;
export const START_BRACES = /{/g;
export const END_BRACES = /}/g;

export class LineParser {

    public hasMethodDefinition(line: string): boolean {
        return !!line.match(METHOD_START_REGEXP);
    }

    public hasStartBraces(line: string): boolean {
        return !!line.match(START_BRACES);
    }

    public hasEndBraces(line: string): boolean {
        return !!line.match(END_BRACES);
    }

}
