'use strict';
let COUNTER = {};

const CONSTS = {
    CLASS: 'CLASS',
    METHOD_COUNT_OVERFLOW: 'METHOD_COUNT_OVERFLOW',
    CLASS_LINE_LENGTH: 'CLASS_LINE_LENGTH',
    CLASS_DEFINITION_MORE_THAN_ONE: 'CLASS_DEFINITION_MORE_THAN_ONE',
    CLASS_NAME_RULE: 'CLASS_NAME_RULE'
};

class Counter {

    static increase(counter, count) {
        if( ! COUNTER[counter]) {
            COUNTER[counter] = count;
        } else {
            COUNTER[counter] += count;
        }
    }

    static get(counter) {
        return COUNTER[counter];
    }

    static count(counter){
        return {
            correct: countCorrectValue(counter),
            incorrect: COUNTER[counter]
        }
    }

}

function countCorrectValue(counter) {
   const value = (COUNTER[CONSTS.CLASS] || 0) - (COUNTER[counter] || 0);
   return value > 0 ? value : 0;
}

module.exports = {
    Counter,
    CONSTS
};
