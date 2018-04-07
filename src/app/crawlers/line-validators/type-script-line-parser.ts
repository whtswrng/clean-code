export const METHOD_START_REGEXP = /([a-zA-Z]\w+)\(.*\).*{/g;
export const START_BRACES = /{/g;
export const END_BRACES = /}/g;
export const MORE_THAN_THREE_ARGUMENTS = /\(.+,.+,.+\,.+\)/g;
export const ES6_CALLBACK = /=>\s*{/g;

export class TypeScriptLineParser {

    public hasFunctionDefinition(line: string): boolean {
        return !!line.match(METHOD_START_REGEXP);
    }

    public hasStartBraces(line: string): boolean {
        return !!line.match(START_BRACES);
    }

    public hasEndBraces(line: string): boolean {
        return !!line.match(END_BRACES);
    }

    public hasFunctionMoreThanThreeArguments(line: string): boolean {
        return !!line.match(MORE_THAN_THREE_ARGUMENTS);
    }

    public hasES6CallBack(line: string): boolean {
        return !!line.match(ES6_CALLBACK);
    }

}
