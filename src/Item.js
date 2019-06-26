import React from 'react';

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
}) => (
  <li>
    {hasItem > 0 && (
      <img src={imageUrl} alt={name} onClick={() => sell(itemPrice)} />
    )}

    {money >= standPrice && !hasItem && (
      <button onClick={() => purchase(setHasItem, hasItem, standPrice)}>
        Purchase {name}
      </button>
    )}
  </li>
);

export default Item;
