'use strict';
const COUNTER = {
    CLASS: 0,
    CLASS_LINE_LENGTH: 0,
    CLASS_DEFINITION_MORE_THAN_ONE: 0,
    CLASS_NAME_RULE: 0
};

const CONSTS = {
    CLASS: 'CLASS',
    CLASS_LINE_LENGTH: 'CLASS_LINE_LENGTH',
    CLASS_DEFINITION_MORE_THAN_ONE: 'CLASS_DEFINITION_MORE_THAN_ONE',
    CLASS_NAME_RULE: 'CLASS_NAME_RULE'
};

const VIOLATION_COUNTER = {

};

class Counter {

    static increase(counter, count) {
        COUNTER[counter] += count;
    }

    static get(counter) {
        return COUNTER[counter];
    }

    static count(counter){
        return {
            correct: COUNTER[CONSTS.CLASS] - COUNTER[counter],
            incorrect: COUNTER[counter]
        }
    }

}

module.exports = {
    Counter,
    CONSTS
};
