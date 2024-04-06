import { isNil } from "lodash";

export function getDecimalPart(number: number, precision = 10) {
  // Use modulo operator to get the remainder
  const remainder = number % 1;
  // Convert remainder to positive if negative
  const positiveRemainder = remainder < 0 ? remainder + 1 : remainder;
  // Adjust the precision based on the number of decimal
  return Number(positiveRemainder.toFixed(precision));
}

export function roundNumber(number: number) {
  // Check the decimal part
  const decimalPart = getDecimalPart(number);
  // is an integer
  if (decimalPart <= 0) return number;
  // false remainder when multiplying real numbers
  if (decimalPart <= 0.01) return Math.floor(number);
  // default takes 2 decimals
  return Number(number.toFixed(2));
}

export function fThousandSeparator(number?: number | string, nullValue = null) {
  if (number === 0 || number === "0") return 0;
  if (!number) return nullValue;

  const thousands = /\B(?=(\d{3})+(?!\d))/g;

  const parts = number.toString().split(".");

  const numberPart = parts[0].replace(thousands, ",");
  const decimalPart = parts[1] ? `.${parts[1]}` : "";

  return numberPart + decimalPart;
}

export const prefixValue = (value?: string | number | null, prefix = "$") => {
  if (isNil(value)) return null;
  return `${prefix}${value}`;
};