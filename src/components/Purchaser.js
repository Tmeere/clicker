import React from 'react';
import {css} from 'emotion';

const Purchaser = ({
  name = '',
  hasItem = 0,
  money = 0,
  purchaserPrice = 0,
  setHasPurchaser = () => {},
  hasPurchaser = 0,
  purchase = () => {},
  highlightColour = '',
  lowlightColour = '',
  textColour = '',
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

    &:disabled {
      background: #ddd;
      border: 1px solid #bbb;
      color: #bbb;
    }
  `;

  const disabled = money < purchaserPrice || hasItem === 0;

  const handleClick = () => {
    purchase(setHasPurchaser, hasPurchaser, -purchaserPrice);
  };

  return (
    <li>
      <button
        className={buttonStyles}
        disabled={disabled}
        onClick={handleClick}>
        Hire {name} Seller
      </button>
    </li>
  );
};

export default Purchaser;
