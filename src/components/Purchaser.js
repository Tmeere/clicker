import React from 'react';
import Button from './Button';

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
        fullWidth={true}
      />
    </li>
  );
};

export default Purchaser;
