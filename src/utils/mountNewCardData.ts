import { cardFlag } from "./cardFlag";

export const mountNewCardData = (cardData: any) => {
  if (cardData.card) {
    const flag: string = cardFlag(cardData.card.type);
    return {
      name: cardData.card.niceType,
      type: cardData.card.type,
      lengths: cardData.card.lengths,
      code: cardData.card.code,
      flagImg: flag,
      isValid: cardData.isValid,
    };
  } else {
    return {
      card: null,
    };
  }
};
