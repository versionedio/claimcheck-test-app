'use strict';

/** Turns a claim amount typed by a person ("$1,200.50", "1200") into whole cents. Returns null when it is not an amount. */
function parseAmountToCents(input) {
  const cleaned = String(input ?? '').replace(/[$,\s]/g, '');
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  return Math.round(Number(cleaned) * 100);
}

/** Returns whether input is a claim id in the form "CLM-12345". */
function isValidClaimId(input) {
  return typeof input === 'string' && /^CLM-\d{5}$/.test(input);
}

module.exports = { parseAmountToCents, isValidClaimId };
