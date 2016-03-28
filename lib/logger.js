'use strict';

var Config = require('./config');
var chalk = require('chalk');

function Logger(options) {
    this._config = new Config(options);
}

Logger.prototype.getConfig = function () {
    return this._config;
};

Logger.prototype.info = function (output) {
    this.createOutput(output, 'info', 'grey');
};

Logger.prototype.log = function (output) {
    this.createOutput(output, 'log', 'green');
};

Logger.prototype.error = function (output) {
    this.createOutput(output, 'error', 'red');
};

Logger.prototype.checkForTagMatchingConsoleMethod = function (tag) {
    var methods = [
        'info',
        'log',
        'error'
    ];

    if (methods.indexOf(tag) !== -1) {
        return console[tag];
    } else {
        return console.log;
    }
};

Logger.prototype.createOutput = function (output, tag, color) {
    tag = tag || this.getConfig().getDefaultTag();

    if (this.tagShouldBeLogged(tag)) {
        var consoleMethod = this.checkForTagMatchingConsoleMethod(tag);
        var message;
        if (typeof color === 'string') {
            message = chalk[color](tag + ' :: ' + output)
        } else {
            message = tag + ' :: ' + output;
        }
        consoleMethod(message);
    }
};
Logger.prototype.logTag = Logger.prototype.createOutput;

Logger.prototype.tagShouldBeLogged = function (tag) {
    tag = tag || this.getDefaultTag();
    return this.getConfig().getTags().some(function (indvTag) {
        return (indvTag === '*' || tag === indvTag);
    });
};

module.exports = Logger;