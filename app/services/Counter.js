'use strict';
const colors = require('colors');

let COUNTER = {
    CLASS: 0,
    CLASS_LINE_LENGTH: 0,
    CLASS_DEFINITION_MORE_THAN_ONE: 0,
    CLASS_NAME_RULE: 0
};

class Counter {

    static increase(counter, count) {
        COUNTER[counter] += count;
    }

    static get(counter) {
        return COUNTER[counter];
    }

}

module.exports = {
    Counter,
    COUNTER
};
