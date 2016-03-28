'use strict';

var Logger = require('./lib/logger');
var _logger = undefined;

module.exports = {
    init: function (options) {
        if (typeof _logger === 'undefined') {
            _logger = new Logger(options);
        }

        return _logger;
    }
};