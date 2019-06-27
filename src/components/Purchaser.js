import React from 'react';
import {css} from 'emotion';

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
      className={css`
        font-family: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
        background: #81bd57;
        border: 0;
        margin-bottom: 20px !important;
        width: 250px;
        display: block;

        &:disabled {
          background: #ddd;
          border: 1px solid #bbb;
        }
      `}
      disabled={money < purchaserPrice || hasItem === 0}
      onClick={() => purchase(setHasPurchaser, hasPurchaser, -purchaserPrice)}>
      Hire {name} Seller
    </button>
  </li>
);

export default Purchaser;
