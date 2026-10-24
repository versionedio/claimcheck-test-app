'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { parseAmountToCents } = require('../src/claims');

test('parses a dollar amount with symbols and separators', () => {
  assert.strictEqual(parseAmountToCents('$1,200.50'), 120050);
});

test('parses a bare number', () => {
  assert.strictEqual(parseAmountToCents('1200'), 120000);
});

test('rejects text that is not an amount', () => {
  assert.strictEqual(parseAmountToCents('twelve'), null);
});
