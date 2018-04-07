"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METHOD_START_REGEXP = /([a-zA-Z]\w+)\(.*\).*{/g;
exports.START_BRACES = /{/g;
exports.END_BRACES = /}/g;
exports.MORE_THAN_THREE_ARGUMENTS = /\(.+,.+,.+\,.+\)/g;
exports.ES6_CALLBACK = /=>\s*{/g;
class LineValidator {
    hasFunctionDefinition(line) {
        return !!line.match(exports.METHOD_START_REGEXP);
    }
    hasStartBraces(line) {
        return !!line.match(exports.START_BRACES);
    }
    hasEndBraces(line) {
        return !!line.match(exports.END_BRACES);
    }
    hasFunctionMoreThanThreeArguments(line) {
        return !!line.match(exports.MORE_THAN_THREE_ARGUMENTS);
    }
    hasES6CallBack(line) {
        return !!line.match(exports.ES6_CALLBACK);
    }
}
exports.LineValidator = LineValidator;
//# sourceMappingURL=line-validator.js.map