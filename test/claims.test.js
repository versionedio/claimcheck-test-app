'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { parseAmountToCents, isValidClaimId } = require('../src/claims');

test('parses a dollar amount with symbols and separators', () => {
  assert.strictEqual(parseAmountToCents('$1,200.50'), 120050);
});

test('parses a bare number', () => {
  assert.strictEqual(parseAmountToCents('1200'), 120000);
});

test('rejects text that is not an amount', () => {
  assert.strictEqual(parseAmountToCents('twelve'), null);
});

test('accepts a claim id with the CLM- prefix and five digits', () => {
  assert.strictEqual(isValidClaimId('CLM-12345'), true);
});

test('rejects claim ids with a wrong prefix, digit count or letters', () => {
  for (const bad of [
    '12345',
    'claim-12345',
    'CLM12345',
    'CLM-1234',
    'CLM-123456',
    'CLM-1234',
    'CLM-123456',
    'CLM-1234a',
    'CLM-123a5',
    'CLM-12345',
    '',
  ]) {
    assert.strictEqual(isValidClaimId(bad), false, `bad claim id: ${bad}`);
  }
});

test('returns false for non-string values without throwing', () => {
  for (const value of [undefined, null, 12345, {}, [], NaN]) {
    assert.strictEqual(isValidClaimId(value), false);
  }
});
