import React from 'react';

const Purchaser = ({
  name,
  hasItem,
  money,
  purchaserPrice,
  setHasPurchaser,
  hasPurchaser,
  purchase,
}) => (
  <li>
    {hasItem > 0 && money >= purchaserPrice && (
      <button
        onClick={() => purchase(setHasPurchaser, hasPurchaser, purchaserPrice)}>
        Purchase {name} Buyer
      </button>
    )}
  </li>
);

export default Purchaser;
