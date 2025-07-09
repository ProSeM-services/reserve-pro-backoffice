export const PAYMENTS_VALUES = [
  "Transferencia",
  "Efectivo",
  "QR",
  "Tarjeta Débito/Crédito",
] as const;

export type Payment = (typeof PAYMENTS_VALUES)[number];
