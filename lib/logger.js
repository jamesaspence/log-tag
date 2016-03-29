'use strict';

var Config = require('./config');
var chalk = require('chalk');

function Logger(options) {
    this._config = new Config(options);
    this.colors = chalk;
}

Logger.prototype.getConfig = function () {
    return this._config;
};

Logger.prototype.info = function (output, color) {
    color = color || 'green';
    this.logTag(output, 'info', color);
};

Logger.prototype.log = function (output, color) {
    color = color || 'green';
    this.logTag(output, 'log', color);
};

Logger.prototype.error = function (output, color) {
    color = color || 'red';
    this.logTag(output, 'error', color);
};

Logger.prototype.getConsoleMethod = function (tag) {
    var methods = [
        'error',
        'info'
    ];

    if (methods.indexOf(tag) !== -1) {
        return console[tag];
    } else {
        return console.log;
    }
};

Logger.prototype.logTag = function (output, tag, color) {
    tag = tag || this.getConfig().getDefaultTag();

    if (this.tagShouldBeLogged(tag)) {
        var message = tag + ' :: ' + output;

        if (typeof color === 'string' && typeof this.colors[color] === 'function') {
            message = this.colors[color](message);
        }
        this.getConsoleMethod(tag)(message);
    }
};

Logger.prototype.tagShouldBeLogged = function (tag) {
    tag = tag || this.getDefaultTag();
    return this.getConfig().getTags().some(function (indvTag) {
        return (indvTag === '*' || tag === indvTag);
    });
};

module.exports = Logger;