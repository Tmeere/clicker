import {useState} from 'react';
import useInterval from 'use-interval';

const useItem = (
  name = '',
  imageUrl = '',
  items = [],
  setMoney = () => {},
  price = 0,
  purchaserPrice = 0,
  standPrice = 0,
) => {
  const [hasItem, setHasItem] = useState(0);
  const [hasPurchaser, setHasPurchaser] = useState(0);
  const [itemClickRate, setItemClickRate] = useState(1);

  useInterval(() => setMoney(hasPurchaser * price), 1000);

  return items.concat({
    hasItem,
    setHasItem,
    itemPrice: price,

    hasPurchaser,
    setHasPurchaser,
    purchaserPrice,

    imageUrl,
    standPrice,
    name,

    itemClickRate,
    setItemClickRate,
  });
};

export default useItem;
