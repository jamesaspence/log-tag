'use strict';

var Logger = require('./logger');

/**
 * @type {Logger}
 * @private
 */
var _instance;

function Factory() {
}

/**
 * Returns our created Logger.
 *
 * @returns {Logger}
 */
Factory.prototype.getInstance = function () {
    return _instance;
};

/**
 * Instantiates a Logger instance and returns it.
 *
 * @param options - the options.
 * @param forceCreate - If set to true, we discard the current instance and recreate.
 * @returns {Logger}
 */
Factory.prototype.init = function (options, forceCreate) {
    if (typeof _instance === 'undefined' || forceCreate) {
        _instance = new Logger(options);
    }

    return _instance;
};

module.exports = new Factory();