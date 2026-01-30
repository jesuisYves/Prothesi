'use strict';

const {
  cancel,
  deny,
  cancellation,
  rejection,
} = require('../dictionary/actions.js');
const { subscription, charge } = require('../dictionary/targets.js');
const { determiner, word } = require('../dictionary/utilities.js');

const stopService =
  `((${deny}|${cancel})( ${word})?( ${determiner}?${subscription})?)`;
const stopBilling = `((${determiner})?${charge} ${cancellation})`;
const notFair = '(not fair)'; // no sense in creating a separate pattern

const cancellationRule = new RegExp([
  stopService,
  stopBilling,
  rejection,
  notFair,
].join('|'), 'ig');

const stub = (rule, request) => request.match(rule)
  ? request.match(rule)[0]
  : 'DOES NOT COVER';

module.exports = { cancellationRule, stub: stub.bind(null, cancellationRule) };
