import React from "react";
import { css } from "emotion";

import Button from "./Button";

const Item = ({
  name = "",
  hasItem = 0,
  setHasItem = () => {},
  imageUrl = "",
  itemPrice = 0,
  standPrice = 0,
  sell = () => {},
  purchase = () => {},
  money = 0,
  highlightColour = "",
  lowlightColour = "",
  textColour = "",
  itemClickRate = 1
}) => {
  const itemStyles = css`
    width: 100px;
    height: 100px;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
  `;

  const imageStyles = css`
    height: 100px;
    width: 100px;

    ${hasItem === 0 &&
      `
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: gray;
      `}
  `;

  const handleButtonClick = () => purchase(setHasItem, hasItem, -standPrice);

  const handleImageClick = () => {
    if (hasItem > 0) return sell(itemPrice, itemClickRate);
    if (hasItem === 0 && money >= standPrice) {
      handleButtonClick();
    }
  };

  const shouldShowButton = money >= standPrice && !hasItem;

  return (
    <li className={itemStyles}>
      {!shouldShowButton && (
        <img
          src={imageUrl}
          alt={name}
          className={imageStyles}
          onClick={handleImageClick}
        />
      )}

      {shouldShowButton && (
        <Button
          text={name}
          handleClick={handleButtonClick}
          highlightColour={highlightColour}
          lowlightColour={lowlightColour}
          textColour={textColour}
        />
      )}
    </li>
  );
};

export default Item;
