export const toHex = (codePoint: number): string => codePoint
.toString(16)
.padStart(4, '0')
.toUpperCase();
