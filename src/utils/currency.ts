export const CONVERSION_RATE = 85;

export function formatINR(usdAmount: number): string {
  const inrAmount = Math.round(usdAmount * CONVERSION_RATE);
  return `₹${inrAmount.toLocaleString('en-IN')}`;
}

export function formatINRAmount(usdAmount: number): string {
  const inrAmount = Math.round(usdAmount * CONVERSION_RATE);
  return inrAmount.toLocaleString('en-IN');
}
