"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METHOD_START_REGEXP = /([a-zA-Z]\w+)\(.*\).*{/g;
exports.START_BRACES = /{/g;
exports.END_BRACKET = /}/g;
exports.MORE_THAN_THREE_ARGUMENTS = /\(.+,.+,.+\,.+\)/g;
exports.ES6_CALLBACK = /=>\s*{/g;
exports.CLASS_DEFINITION = /class\s+\w+/g;
class TypeScriptLineParser {
    hasFunctionDefinition(line) {
        return !!line.match(exports.METHOD_START_REGEXP);
    }
    hasStartBraces(line) {
        return !!line.match(exports.START_BRACES);
    }
    hasEndBracket(line) {
        return !!line.match(exports.END_BRACKET);
    }
    hasFunctionMoreThanThreeArguments(line) {
        return !!line.match(exports.MORE_THAN_THREE_ARGUMENTS);
    }
    hasES6CallBack(line) {
        return !!line.match(exports.ES6_CALLBACK);
    }
    hasClassDefinition(line) {
        return !!line.match(exports.CLASS_DEFINITION);
    }
}
exports.TypeScriptLineParser = TypeScriptLineParser;
//# sourceMappingURL=type-script-line-parser.js.map