'use strict';

Object.defineProperty(exports, '__esModule', {
    value : true,
});
exports.default = void 0;

const fs = require('fs');

const warn = (msg) => {
    console.warn(`\x1b[1m\x1b[33m[postcss-add-dependencies]\x1b[0m\x1b[33m ${msg}\x1b[0m\n`);
}

const pluginCreator = (opts = {}) => {
    return {
       postcssPlugin : 'postcss-add-dependencies',
       Once : (root, {result}) => {
          if (typeof opts.dependencies == 'undefined')
              return warn('Missing required `dependencies` option');

          if (!(opts.dependencies instanceof Array))
              return warn('Required `dependencies` option must be an array');

          for (const i in opts.dependencies) {
              var dependency = opts.dependencies[i];
              if (typeof dependency != 'object' || dependency === null)
                  warn('Item `dependencies[' + i + ']` is not object');
              else if (!dependency.type)
                  warn('Item `dependencies[' + i + ']` does not have `type` property');
              else if (!dependency.file && !dependency.dir)
                  warn('Item `dependencies[' + i + ']` does not have `file` or `dir` property');
              else if (dependency.file && !fs.existsSync(dependency.file))
                  warn('Path in `dependencies[' + i + '].file` does not exist');
              else if (dependency.dir && !fs.existsSync(dependency.dir))
                  warn('Path in `dependencies[' + i + '].dir` does not exist');
              else
                  result.messages.push(dependency);
          }
       }
   }
};

pluginCreator.postcss = true;
var _default = pluginCreator;
exports.default = _default;
module.exports = exports.default;
