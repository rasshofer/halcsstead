var fs = require('fs');
var path = require('path');
var tap = require('tap');
var halcsstead = require('../halcsstead');

// API

tap.equal(typeof halcsstead, 'object');
tap.equal(typeof halcsstead.selector, 'function');
tap.equal(typeof halcsstead.parse, 'function');

// Selector API

tap.equal(halcsstead.selector(null), false);
tap.equal(halcsstead.selector(), false);
tap.equal(halcsstead.selector(''), false);
tap.deepEqual(halcsstead.selector('body'), {
  difficulty: 0,
  effort: 0,
  length: 0,
  totalOperands: 0,
  totalOperators: 0,
  uniqueOperands: 0,
  uniqueOperators: 5,
  vocabulary: 5,
  volume: 0
});
tap.deepEqual(halcsstead.selector('.grid-homepage .teaser .article-title .headline'), {
  difficulty: 25,
  effort: 4250,
  length: 51,
  totalOperands: 9,
  totalOperators: 42,
  uniqueOperands: 5,
  uniqueOperators: 5,
  vocabulary: 10,
  volume: 170
});
tap.equal(halcsstead.selector(new Array(3).join(' ')), false);

// Parser API

tap.equal(halcsstead.parse(null), false);
tap.equal(halcsstead.parse(), false);
tap.equal(halcsstead.parse(''), false);
tap.equal(halcsstead.parse('invalid code'), false);
tap.equal(halcsstead.parse(new Array(3).join(' ')), false);
tap.equal(halcsstead.parse('/* comment */'), false);

[
  'test1',
  'test2',
  'test3',
  'test4'
].forEach(function (test) {
  var css = fs.readFileSync(path.resolve(__dirname, test + '.css'), 'utf8');
  var result = halcsstead.parse(css);
  var expected = require(path.resolve(__dirname, test + '.json'), 'utf8');
  tap.deepEqual(result, expected);
});
