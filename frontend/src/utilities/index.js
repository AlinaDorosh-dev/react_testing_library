//The Intl.NumberFormat object enables language-sensitive number formatting.
// is a JavaScript built-in object that provides formatting options for numbers according to the locale settings of the user's browser. It allows you to format numbers in a way that is appropriate for a specific locale, including options for decimal separators, digit grouping, and currency symbols.

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
