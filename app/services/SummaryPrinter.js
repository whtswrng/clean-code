'use strict';
const ClassCounter = require('./ClassCounter').Counter;
const CLASS_CONSTS = require('./ClassCounter').CONSTS;
const MethodCounter = require('./MethodCounter').Counter;
const METHOD_CONSTS = require('./MethodCounter').CONSTS;
const colors = require('colors');

class SummaryPrinter {

    static start(){
        console.log('');
        console.log('SUMMARY'.bold.underline);
        console.log('');
    }

    static printClassSummary() {
        console.log('Class design'.bold);
        printClassLineLength();
        printClassLineName();
        printClassDefinitionMoreThanOne();
        // printMethodCountOverflow();
    }

    static printMethodSummary() {
        console.log('Method design'.bold);
        printCallbackHell();
        printMethodLongLines();
        printMethodArgumentLength();
        printBooleanAsArgument();
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

function printCallbackHell() {
    const summary = MethodCounter.count(METHOD_CONSTS.CALLBACK_HELL);
    console.log(`   ✓ `.green + `${summary.correct} functions does not have callback hell problem`);

    if(summary.incorrect) {
        console.log(`       ✖ `.red + `${summary.incorrect} functions have callback hell problem`.bold);
    }
}

function printMethodLongLines() {
    const summary = MethodCounter.count(METHOD_CONSTS.METHOD_LONG_LINE);
    console.log(`   ✓ `.green + `${summary.correct} functions does not violate long lines`);

    if(summary.incorrect) {
        console.log(`       ✖ `.red + `${summary.incorrect} functions does violate long lines`.bold);
    }
}

function printMethodArgumentLength() {
    const summary = MethodCounter.count(METHOD_CONSTS.METHOD_ARGUMENT_LENGTH);
    console.log(`   ✓ `.green + `${summary.correct} functions does not violate argument length`);

    if(summary.incorrect) {
        console.log(`       ✖ `.red + `${summary.incorrect} functions does violate argument length`.bold);
    }
}

// function printMethodCountOverflow() {
//     const summary = MethodCounter.count(METHOD_CONSTS.METHOD_COUNT_OVERFLOW);
//     console.log(`   ✓ `.green + `${summary.correct} functions does not violate argument length`);
//
//     if(summary.incorrect) {
//         console.log(`       ✖ `.red + `${summary.incorrect} functions does violate argument length`.bold);
//     }
// }

function printBooleanAsArgument() {
    const summary = MethodCounter.count(METHOD_CONSTS.BOOLEAN_AS_ARGUMENT);
    console.log(`   ✓ `.green + `${summary.correct} functions does not violate boolean as argument rule`);

    if(summary.incorrect) {
        console.log(`       ✖ `.red + `${summary.incorrect} functions does violate boolean as argument rule`.bold);
    }
}

module.exports = SummaryPrinter;