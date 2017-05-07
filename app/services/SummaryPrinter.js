'use strict';
const ClassCounter = require('./ClassCounter').Counter;
const CLASS_CONSTS = require('./ClassCounter').CONSTS;
const colors = require('colors');

class SummaryPrinter {

    static split(){
        console.log('');
        console.log('SUMMARY'.bold.underline);
        console.log('');
    }

    static printClassSummary() {
        console.log('Class design'.bold);
        printClassLineLength();
        console.log(`   ✓ `.green + `${ClassCounter.get(CLASS_CONSTS.CLASS)} classes does not violate line name rule`);
        console.log(`   ✓ `.green + `${ClassCounter.get(CLASS_CONSTS.CLASS)} classes does not have more than 1 definition in file`);
    }

}

function printClassLineLength() {
    const summary = ClassCounter.count(CLASS_CONSTS.CLASS_LINE_LENGTH);

    console.log(`   ✓ `.green + `${summary.correct} classes does not violate line length rule`);
    if(summary.incorrect) {
        console.log(`       ✖ `.red + `${summary.incorrect} classes violate line length rule`.bold);
    }

}

module.exports = SummaryPrinter;