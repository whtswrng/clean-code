'use strict';
const colors = require('colors');

class PrinterAdapter {
    static warning (msg) {
        console.error(`  ${msg}`.yellow);
    }

    static title (msg) {
        console.error('\n');
        console.error(`✖ ${msg}`.red);
    }

    static log (msg) {
        console.log(msg);
    }

    static error(msg) {
        console.error(`${msg}`.red);
    }
}

module.exports = PrinterAdapter;
