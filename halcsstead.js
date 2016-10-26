var css = require('css');
var cssSelectorTree = require('css-selector-tree');
var unique = require('array-unique');

function calculcateSelectorMetrics (selector) {

  if (!selector) {
    return false;
  }

  var conditions = cssSelectorTree.conditions(selector);

  if (conditions === false) {
    return false;
  }

  var uniqueOperators = 5; // if, (, ), {, }
  var operatorsPerItem = 7; // e.g. »IF (is_pseudo_element('first-line')) { … }«
  var totalOperators = operatorsPerItem * conditions.length;

  var operands = [];

  conditions.forEach(function (item) {
    if (item.type === 'child') {
      operands.push('is_child');
    } else if (item.type === 'operator') {
      operands.push('is_' + item.operator);
    } else {
      operands.push('is_' + item.type);
      operands.push(item.name);
    }
  });

  var totalOperands = operands.length;

  var uniqueOperands = unique(operands).length;

  var vocabulary = (uniqueOperators + uniqueOperands);
  var length = (totalOperators + totalOperands);
  var volume = Math.ceil(length * Math.log(vocabulary) / Math.LN2);
  var difficulty = (uniqueOperators * uniqueOperands);
  var effort = (difficulty * volume);

  return {
    uniqueOperators: uniqueOperators,
    uniqueOperands: uniqueOperands,
    totalOperators: totalOperators,
    totalOperands: totalOperands,
    vocabulary: vocabulary,
    length: length,
    volume: volume,
    difficulty: difficulty,
    effort: effort
  };

}

function parseCss (code) {

  if (!code) {
    return false;
  }

  var obj;
  var results = [];

  try {
    obj = css.parse(code);
  } catch (e) {
    return false;
  }

  if (obj.stylesheet && obj.stylesheet.rules) {
    obj.stylesheet.rules.forEach(function (rule) {
      if (rule.selectors && rule.selectors.length) {
        rule.selectors.forEach(function (selector) {
          results.push({
            selector: selector,
            metrics: calculcateSelectorMetrics(selector)
          });
        });
      }
    });
  }

  if (!results.length) {
    return false;
  }

  return results.sort(function (a, b) {
    return a.metrics.effort - b.metrics.effort;
  }).reverse();

}

module.exports = {
  selector: calculcateSelectorMetrics,
  parse: parseCss
};
