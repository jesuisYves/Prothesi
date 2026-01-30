'use strict';

const {
  negation,
  determiner,
  word,
} = require('./utilities.js');
const { charge } = require('./targets.js');

const cancel = [
  'block',
  'cancel[a-z]*', // add stemming
  'deactivate',
  'delete',
  `${negation} charge`,
  `freeze(?: ${word})?`,
  'withdraw',
  'stop',
  'revert',
  'suspend',
  'terminate',
  'unbill(?: me)?', // need to separate 'me'
  'unsubscribe',
  `${negation} want`,
];

const interact = [
  'join',
  'sign up',
  'authori(?:z|s)e',
  'pay',
  'agree[a-z]*', // add stemming
  'permit[a-z]*', // add stemming
  'subscribe',
].join('|');

const deny = [
  `${negation}(?: ${word})* (?:${charge}|${interact})`,
];

const cancellation = [
  'cancellation',
  'termination',
];

const permission = [
  'permission',
  'entitled',
  'consent',
  ].join('|');

const rejection = [
  `${negation} (?:${permission})`,
  `without (?:${determiner}(?:${permission}))`,
];

module.exports = {
  cancel: `(?:${cancel.join('|')})`,
  deny: `(?:${deny.join('|')})`,
  cancellation: `(?:${cancellation.join('|')})`,
  rejection: `(${rejection.join('|')})`,
};
