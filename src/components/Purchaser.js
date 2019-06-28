import React from "react";
import { css } from "emotion";
import Button from "./Button";

const Purchaser = ({
  name = "",
  hasItem = 0,
  money = 0,
  purchaserPrice = 0,
  setHasPurchaser = () => {},
  hasPurchaser = 0,
  purchase = () => {},
  highlightColour = "",
  lowlightColour = "",
  textColour = ""
}) => {
  const buttonStyles = css`
    font-family: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    background: ${highlightColour};
    border: 1px solid ${lowlightColour};
    margin-bottom: 20px !important;
    width: 250px;
    display: block;
    color: ${textColour};
    transition: color 0.3s, background: 0.3s, border 0.3s;

    &:disabled {
      background: #ddd;
      border: 1px solid #bbb;
      color: #bbb;
    }
  `;

  const disabled = money < purchaserPrice || hasItem === 0;

  const handleButtonClick = () => {
    purchase(setHasPurchaser, hasPurchaser, -purchaserPrice);
  };

  return (
    <li>
      <Button
        text={name}
        handleClick={handleButtonClick}
        highlightColour={highlightColour}
        lowlightColour={lowlightColour}
        textColour={textColour}
        disabled={disabled}
        fullWidth={fullWidth}
      />
    </li>
  );
};

export default Purchaser;
