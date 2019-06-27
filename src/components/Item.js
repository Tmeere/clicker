import React from "react";
import { css } from "emotion";

const Item = ({
  name,
  hasItem,
  setHasItem,
  imageUrl,
  itemPrice,
  standPrice,
  sell,
  purchase,
  money,
  highlightColour,
  lowlightColour,
  itemClickRate
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
        filter: url(~"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: gray;
      `}
  `;

  const buttonStyles = css`
    height: 100px;
    background: ${highlightColour};
    border: 1px solid ${lowlightColour};
    width: 100px;
    font-family: -apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
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
        <button className={buttonStyles} onClick={handleButtonClick}>
          Purchase {name}
        </button>
      )}
    </li>
  );
};

export default Item;
