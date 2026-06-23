export function formatCurrency(value: number | string) {
  const amount = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}