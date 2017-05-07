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
        printClassLineName();
        printClassDefinitionMoreThanOne();
    }

}

function printClassLineLength() {
    const summary = ClassCounter.count(CLASS_CONSTS.CLASS_LINE_LENGTH);
    console.log(`   ✓ `.green + `${summary.correct} classes does not violate line length rule`);

    if(summary.incorrect) {
        console.log(`       ✖ `.red + `${summary.incorrect} classes violate line length rule`.bold);
    }

}

function printClassLineName() {
    const summary = ClassCounter.count(CLASS_CONSTS.CLASS_NAME_RULE);
    console.log(`   ✓ `.green + `${summary.correct} classes does not violate name rule`);

    if(summary.incorrect) {
        console.log(`       ✖ `.red + `${summary.incorrect} classes violate name rule`.bold);
    }
}

function printClassDefinitionMoreThanOne() {
    const summary = ClassCounter.count(CLASS_CONSTS.CLASS_DEFINITION_MORE_THAN_ONE);
    console.log(`   ✓ `.green + `${summary.correct} classes does not have more than 1 definition in file`);

    if(summary.incorrect) {
        console.log(`       ✖ `.red + `${summary.incorrect} classes have more than 1 definition in file`.bold);
    }
}

module.exports = SummaryPrinter;