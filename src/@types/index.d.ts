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

export interface ICardData {
  card: {
    niceType: string;
    name: string;
    type: CardFlag;
    patterns: number[];
    gaps: number[];
    lengths: number[];
    code: {
      name: string;
      size: number;
    };
    matchStrength: number;
  };
  isPotentiallyValid: boolean;
  isValid: boolean;
  flagImg: string | undefined;
}
