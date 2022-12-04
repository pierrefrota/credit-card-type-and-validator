import creditCardType from "credit-card-type";

export const getCreditCardType = (creditCard: string) => {
  return creditCardType(creditCard);
};
