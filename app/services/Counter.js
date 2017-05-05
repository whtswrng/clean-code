'use strict';
const colors = require('colors');

let classCounter = 0;

class Counter {

    static count() {

    }

    static increaseClassCount(count) {
        classCounter = classCounter + count;
    }

    static getClassCount() {
        return classCounter;
    }

}

module.exports = Counter;
