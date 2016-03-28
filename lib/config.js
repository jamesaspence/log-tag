'use strict';

var Env = require('./env');

var defaults = {
    useEnv: false,
    envTagKey: 'LOG_TAGS',
    tags: [
        '*'
    ],
    defaultTag: 'log'
};

function Config(options) {
    if (typeof options !== 'object') {
        options = {};
    }

    for (var key in defaults) {
        if (defaults.hasOwnProperty(key) && (!options.hasOwnProperty(key))) {
            options[key] = defaults[key];
        }
    }

    if (options.useEnv) {
        options.tags = Env.getEnvArray(options.envTagKey, ['*']);
    }

    this._options = options;
}

Config.prototype.getDefaultTag = function () {
    return this._options.defaultTag;
};

Config.prototype.getTags = function () {
    return this._options.tags;
};

module.exports = Config;