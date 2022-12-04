import valid from "card-validator";
import { mountNewCardData } from "./mountNewCardData";

export const checkIfCardIsValid = (card: string) => {
  const cardData = valid.number(card);
  return mountNewCardData(cardData);
};
