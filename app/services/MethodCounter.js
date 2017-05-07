'use strict';
let COUNTER = {};

const CONSTS = {
    METHOD: 'METHOD',
    CALLBACK_HELL: 'CALLBACK_HELL',
    METHOD_LONG_LINE: 'METHOD_LONG_LINE',
    METHOD_ARGUMENT_LENGTH: 'CLASS_NAME_RULE',
    METHOD_COUNT_OVERFLOW: 'METHOD_COUNT_OVERFLOW',
    BOOLEAN_AS_ARGUMENT: 'BOOLEAN_AS_ARGUMENT'
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
            correct: COUNTER[CONSTS.METHOD] || 0 - COUNTER[counter] || 0,
            incorrect: COUNTER[counter]
        }
    }

}

module.exports = {
    Counter,
    CONSTS
};
