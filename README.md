# HalCSStead

> A small helper to calculcate the Halstead metrics of CSS selectors

[![Build Status](https://travis-ci.org/rasshofer/halcsstead.svg)](https://travis-ci.org/rasshofer/halcsstead)
[![Coverage Status](https://coveralls.io/repos/github/rasshofer/halcsstead/badge.svg)](https://coveralls.io/github/rasshofer/halcsstead)
[![Dependency Status](https://david-dm.org/rasshofer/halcsstead/status.svg)](https://david-dm.org/rasshofer/halcsstead)
[![Dependency Status](https://david-dm.org/rasshofer/halcsstead/dev-status.svg)](https://david-dm.org/rasshofer/halcsstead)

## Installation

```shell
npm install halcsstead --save-dev
```

## Examples

### Calculcate selector metrics

```js
var halcsstead = require('halcsstead');
var metrics = halcsstead.selector('.teaser .article-title .headline');
console.log(JSON.stringify(metrics, null, 2));
```

### Parse CSS file and calculcate selector metrics

```js
var halcsstead = require('halcsstead');
var results = halcsstead.parse('.teaser .article-title .headline { color: red } body { background: red }');
console.log(JSON.stringify(results, null, 2));
```

## API

### halcsstead.selector(selector)

Accepts a CSS selector and returns its metrics.

In case no valid CSS selector is provided, `false` is returned.

### halcsstead.parse(code)

Accepts CSS code and returns an object containing the metrics per selector, ordered decreasingly by difficulty.

In case no valid CSS selector is found within the provided CSS code, `false` is returned.

## Changelog

* 0.0.1
  * Initial version

## License

Copyright (c) 2016 [Thomas Rasshofer](http://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
