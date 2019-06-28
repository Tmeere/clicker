import React from "react";
import Button from "./Button";
const Bonus = ({
  setItemClickRate = () => {},
  itemClickRate = 1,
  bonusName = "",
  highlightColour = "",
  lowlightColour = "",
  textColour = "",
  bonusPrice = 0,
  hasItem = false,
  money = 0,
  hasBonus = 0,
  setHasBonus = () => {}
}) => {
  const handleClick = () => {
    setItemClickRate(itemClickRate + 1);
    setHasBonus(hasBonus + 1);
  };

  const disabled = !hasItem || money < bonusPrice;

  if (hasBonus > 0) return null;

  return (
    <Button
      handleClick={handleClick}
      text={bonusName}
      highlightColour={highlightColour}
      lowlightColour={lowlightColour}
      textColour={textColour}
      disabled={disabled}
      fullWidth={true}
    />
  );
};

export default Bonus;
