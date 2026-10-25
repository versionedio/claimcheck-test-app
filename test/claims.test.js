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

test('accepts a valid claim id', () => {
  assert.strictEqual(isValidClaimId('CLM-12345'), true);
});

test('rejects a claim id without the CLM- prefix', () => {
  assert.strictEqual(isValidClaimId('12345'), false);
});

test('rejects claim ids with fewer or more than five digits', () => {
  assert.strictEqual(isValidClaimId('CLM-1234'), false);
  assert.strictEqual(isValidClaimId('CLM-123456'), false);
});

test('rejects claim ids with letters in the number', () => {
  assert.strictEqual(isValidClaimId('CLM-1234A'), false);
});

test('rejects non-string claim ids without throwing', () => {
  for (const input of [null, undefined, 12345, {}, []]) {
    assert.strictEqual(isValidClaimId(input), false);
  }
});
