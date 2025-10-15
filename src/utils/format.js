/**
 * Formatting helpers.
 */

/** @param {number} n */
export function formatCurrency(n) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  } catch (_e) {
    return `$${(n || 0).toFixed(2)}`;
  }
}

/** @param {number} ts */
export function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString();
}