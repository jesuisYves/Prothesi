'use strict';

const cancelRequests = require('./cancel.js');
// const refundRequests = require('./refund.js');
const { stub } = require('../src/index.js');
const { chroma, tag } = require('./utils/chroma.js');

const fail = tag('red', 'bold red inverse');
const summary = chroma.bind(null, 'bold');

const test = (fn, cases, testName) => {
  console.log(chroma('dim', `Running ${testName}`));
  const length = cases.length;
  let failed = 0;
  for (const [raw, expected] of cases) {
    const result = fn(raw);
    if (result !== expected) {
      failed++;
      console.log(fail`Expected: ${expected}, while got: ${result}`);
    }
  }
  console.log(summary(`Done. ${length - failed} out of ${length} succeded.\n`));
};

test(stub, cancelRequests, 'Cancellation');
// test(stub, refundRequests, 'Refund');
