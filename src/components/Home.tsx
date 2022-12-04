import { blackA, green, mauve, red, violet } from "@radix-ui/colors";
import { keyframes, styled } from "@stitches/react";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { ICardData } from "../@types";
import { inputMask } from "../utils/inputMask";

const DialogDemo = () => {
  const [card, setCard] = useState("");
  const [cardData, setCardData] = useState<ICardData | null>(null);

  const onInputCardChange = (card: string) => {
    fetch(`/api/v1/valid?card=${card}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => setCardData(data));

    const { masked } = inputMask(
      card,
      cardData?.card && cardData?.card?.type === "american-express" ? "#### ###### #####" : "#### #### #### ####",
      "number"
    );
    setCard(masked);
  };

  return (
    <DialogContent>
      <DialogTitle>Serviço para verificar o tipo de bandeira do cartão e se o mesmo é válido.</DialogTitle>
      <DialogDescription>Digite o cartão para realizar os testes (use sites geradores de cartão).</DialogDescription>
      <Fieldset
        className={classNames({
          valid: card.length >= 15 && cardData?.isValid!,
          invalid: card.length >= 15 && !cardData?.isValid!,
        })}
      >
        <Input
          id="card"
          placeholder="1234 5678 9876 5432"
          value={card}
          onChange={(card) => onInputCardChange(card.target.value)}
        />
        <Label htmlFor="username">
          {cardData?.flagImg ? (
            <Image src={cardData?.flagImg} alt={cardData?.card?.name} width={46} height={46} />
          ) : (
            <Image src="/assets/images/flags/no-img.png" alt="Sem cartão" width={46} height={46} />
          )}
        </Label>
      </Fieldset>
      <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}></Flex>
    </DialogContent>
  );
};

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const DialogOverlay = styled("div", {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const DialogContent = styled("div", {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  "&:focus": { outline: "none" },
});

const DialogTitle = styled("div", {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 17,
});

const DialogDescription = styled("div", {
  margin: "10px 0 20px",
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Flex = styled("div", { display: "flex" });

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 16,
  alignItems: "center",
  marginBottom: 15,
  boxShadow: `0 0 0 1px ${violet.violet8}`,
  borderRadius: 4,
  padding: "0 8px",

  "&.invalid": { boxShadow: `0 0 0 2px ${red.red8}` },
  "&.valid": { boxShadow: `0 0 0 2px ${green.green8}` },
});

const Label = styled("label", {
  width: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input", {
  all: "unset",
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  lineHeight: 1,
  color: violet.violet11,
  height: 48,
});

export default DialogDemo;
