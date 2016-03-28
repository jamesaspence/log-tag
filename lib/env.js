'use strict';

function Env() {

}

Env.prototype.getEnv = function (key, defaultValue) {
    if (typeof process.env[key] !== 'undefined' && process.env[key] !== null) {
        var value = process.env[key];
        switch (value) {
            case 'true':
            case '(true)':
                return true;
            case 'false':
            case '(false)':
                return false;
            default:
                return value;
        }
    } else {
        return defaultValue;
    }
};

Env.prototype.getEnvArray = function (key, defaultValue) {
    if (!defaultValue instanceof Array) {
        defaultValue = [];
    }

    var value = this.getEnv(key);

    if (typeof value !== 'undefined') {
        return value.split(',');
    } else {
        return defaultValue;
    }
};

module.exports = new Env();