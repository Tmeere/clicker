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
      Hire {name} Seller
    </button>
  </li>
);

export default Purchaser;
