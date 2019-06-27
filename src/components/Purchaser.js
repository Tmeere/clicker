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
    <button
      disabled={money < purchaserPrice || hasItem === 0}
      onClick={() => purchase(setHasPurchaser, hasPurchaser, -purchaserPrice)}>
      Purchase {name} Buyer
    </button>
  </li>
);

export default Purchaser;
