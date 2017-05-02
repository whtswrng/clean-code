'use strict';
const CONSTS = require('../consts');
const colors = require('colors');
const fs = require('fs');
const _ = require('lodash');

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
