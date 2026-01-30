'use strict';

const config = require('eslint-config-metarhia');

module.exports = [
  ...config,
  {
    rules: {
      'max-len': ['error', { 'code': 80, 'ignoreComments': true }],
    },
  },
];
