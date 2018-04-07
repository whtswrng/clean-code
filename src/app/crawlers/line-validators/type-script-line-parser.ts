export const METHOD_START_REGEXP = /([a-zA-Z]\w+)\(.*\).*{/g;
export const START_BRACES = /{/g;
export const END_BRACKET = /}/g;
export const MORE_THAN_THREE_ARGUMENTS = /\(.+,.+,.+\,.+\)/g;
export const ES6_CALLBACK = /=>\s*{/g;
export const CLASS_DEFINITION = /class\s+\w+/g;

export class TypeScriptLineParser {

    public hasFunctionDefinition(line: string): boolean {
        return !!line.match(METHOD_START_REGEXP);
    }

    public hasStartBraces(line: string): boolean {
        return !!line.match(START_BRACES);
    }

    public hasEndBracket(line: string): boolean {
        return !!line.match(END_BRACKET);
    }

    public hasFunctionMoreThanThreeArguments(line: string): boolean {
        return !!line.match(MORE_THAN_THREE_ARGUMENTS);
    }

    public hasES6CallBack(line: string): boolean {
        return !!line.match(ES6_CALLBACK);
    }

    public hasClassDefinition(line: string): boolean {
        return !!line.match(CLASS_DEFINITION);
    }
}
