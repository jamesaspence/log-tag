# LogTag

LogTag is a simple logging library meant for one thing -
simple, tagged logging.

Tired of your console full of errant logs? Want to leave
them in the code, but disable them? Use tags to determine
what shows, and what doesn't.

# Installation / Configuration
`npm i --save jamesspence/log-tag`

```
//We need to init before we use.
//We can pass configuration variables here.
//Available options:
var configuration = {
    useEnv: false,
    tags: [
        'critical',
        'error'
    ]
}
var Logger = require('log-tag').init();
```
After intialization, you can include it using:
```
    var Logger = require('log-tag').getInstance();
```
# Usage
With tags `critical` and `error` appearing, logging like so:
```
Logger.logTag('CRITICAL ERROR OH NO', 'critical');
Logger.logTag('NORMAL ERROR OH NO', 'error');
Logger.log('Warning, but you good dude', 'warning');
```
will output:
```
critical :: CRITICAL ERROR OH NO
error :: NORMAL ERROR OH NO
```
The warning tag will be suppressed and not output anything.

You can also use a few pre-defined methods for logging:
```
Logger.log('This is a normal console.log');
Logger.error('This is a console.error');
Logger.info('This is a console.info');
```
These shorthand methods will output with the same tag
as method name (i.e. `Logger.log('hello')` will output
`log :: hello`)

Using built-in chalk support, you can even color your outputs:
```
    Logger.logTag('ERROR!', 'error', 'red');

    //Altenatively, color just your output
    Logger.logTag(Logger.colors.white('Colors are cool.'), 'learning');
```

The `color` parameter passed to `logTag` as well as the three
helper methods will color the entire output, including the tag.