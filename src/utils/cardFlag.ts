export type CardFlag =
  | "visa"
  | "mastercard"
  | "american-express"
  | "diners-club"
  | "discover"
  | "jcb"
  | "unionpay"
  | "maestro"
  | "mir"
  | "elo"
  | "hiper"
  | "hipercard";

export const cardFlag = (cardType: CardFlag): string => {
  return `/assets/images/flags/${cardType}.png`;
};
