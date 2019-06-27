import React from 'react';
import {css} from 'emotion';

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
  <li
    className={css`
      position: relative;
      width: 200px;
      height: 200px;
      margin-right: 20px;
      margin-bottom: 20px;
      float: left;
    `}>
    <img
      src={imageUrl}
      alt={name}
      className={css`
        position: absolute;
        height: 200px;
        width: 200px;
        ${hasItem === 0 &&
          `
            filter: url(~"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
            -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: gray;
          `}
      `}
      onClick={() => hasItem > 0 && sell(itemPrice)}
    />

    {money >= standPrice && !hasItem && (
      <button
        className={css`
          position: absolute;
          top: 50%;
          margin-top: -25px;
          z-index: 2;
          height: 50px;
          background: #81bd57;
          border: 0;
          width: 200px;
          font-family: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
        `}
        onClick={() => purchase(setHasItem, hasItem, -standPrice)}>
        Purchase {name}
      </button>
    )}
  </li>
);

export default Item;
