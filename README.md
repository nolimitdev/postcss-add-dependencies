# postcss-add-dependencies [![](https://img.shields.io/npm/v/postcss-add-dependencies.svg)](https://www.npmjs.com/package/postcss-add-dependencies)

PostCSS plugin to add dependencies that are necessary for webpack to understand when it needs to run recompilation on the changed files.
This is usefull to watch config files of PostCSS plugins which do not watch it by default. For example:
- https://www.npmjs.com/package/postcss-mixins `mixinsDir` and `mixinsFiles` options
- https://www.npmjs.com/package/postcss-custom-properties `importFrom` option
- https://www.npmjs.com/package/postcss-color-mod-function `importFrom` option
- and many other plugins and `postcss.config.js` file too

## Install

To install with npm or yarn, use

```shell
npm install --save postcss-add-dependencies

// or

yarn add postcss-add-dependencies
```

## Options

### dependencies

Array of dependencies. Dependency (array item) is object with type and file/dir properties. Possible dependency types:

```js
{ type : "dependency", file : "/abs/path/to/file.ext" }
{ type : "build-dependency", file : "/abs/path/to/file.ext" }
{ type : "missing-dependency", file : "/abs/path/to/file.ext" }
{ type : "context-dependency", file : "/abs/path/to/file.ext" }
{ type : "dir-dependency", file : "/abs/path/to/dir" }
{ type : "asset", file : "/abs/path/to/file.ext", content : ..., sourceMap : ..., info : ... }
```
See https://github.com/webpack-contrib/postcss-loader/blob/v6.2.0/src/index.js#L189-L217

## Usage

*postcss.config.js*

```js
const path = require("path");

const dependencies = [
    { type : "dependency", file : path.resolve("/abs/path/to/file.ext") },
    { type : "dir-dependency", dir : path.resolve("/abs/path/to/dir") },
];

module.exports = {
    plugins: [
        // Plugins for PostCSS
        ['postcss-add-dependencies', { dependencies : dependencies }],
    ],
};
```
