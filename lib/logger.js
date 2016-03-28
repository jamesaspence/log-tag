'use strict';

var Config = require('./config');

function Logger(options) {
    this._config = new Config(options);
}

Logger.prototype.getConfig = function () {
    return this._config;
};

Logger.prototype.info = function (output) {
    this.createOutput(output, 'info');
};

Logger.prototype.log = function (output) {
    this.createOutput(output, 'log');
};

Logger.prototype.error = function (output) {
    this.createOutput(output, 'error');
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

Logger.prototype.createOutput = function (output, tag) {
    tag = tag || this.getConfig().getDefaultTag();

    if (this.tagShouldBeLogged(tag)) {
        var consoleMethod = this.checkForTagMatchingConsoleMethod(tag);
        consoleMethod(tag + ' :: ' + output);
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