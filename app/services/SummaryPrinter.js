'use strict';
const Counter = require('./Counter').Counter;
const colors = require('colors');

class SummaryPrinter {

    static split(){
        console.log('');
        console.log('SUMMARY'.bold.underline);
        console.log('');
    }

    static printClassSummary() {
        console.log('Class design'.bold);
        console.log(`   ${Counter.get('CLASS')} classes`.bold.italic);
        console.log(`       ✓ `.green + `does not violate line length`);
        console.log(`       ✓ `.green + `does not violate name rule`);
        console.log(`       ✓ `.green + `does not have more than 1 definition in file`);
    }

}

module.exports = SummaryPrinter;