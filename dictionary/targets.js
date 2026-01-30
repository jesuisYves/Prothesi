'use strict';

const charge = [
  'charge',
  'bill',
  'payment',
  'fee',
  'debit',
]; // makes sense to add optional plural already here

const subscription = [
  'account',
  'membership',
  'subscription',
  'billing',
  'service',
  'month extension',
  'contract',
  'plan',
  `(?:future )?(${charge.join('|')})(?:s)?`,
]; // need to add 'cancel charge' exclusion

module.exports = {
  subscription: `(?:${subscription.join('|')})`,
  charge: `(?:${charge.join('|')})(?:s)?`,
};
