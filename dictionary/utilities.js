'use strict';

const apostrophe = `(?:'|’|ʼ)`;
const not = `(?:n(?:o|${apostrophe}?)t?)`;
const auxiliary = `(?:(?:(?:a|${apostrophe}?)m|are|do(?:es)?|did|will|wo) ?)`;
const negation = `(?:(?:${auxiliary}?${not})|never)`; // dissect determiners and indicators to match separately `${indicator}|${determiner}${subscription}`
const determiner = '(?:[a-z]{1,5} )';
const word = '(?:[a-z]+)';

module.exports = {
  apostrophe,
  not,
  auxiliary,
  negation,
  determiner,
  word,
};
