import {useState} from 'react';
import useInterval from 'use-interval';

const useItem = (price = 0, setMoney = () => {}, purchaserPrice = 0, imageUrl = '', standPrice, name, items = []) => {
  const [hasItem, setHasItem] = useState(0);
  const [hasPurchaser, setHasPurchaser] = useState(0);
  const [itemClickRate, setItemClickRate] = useState(1);

  useInterval(() => setMoney(hasPurchaser * price), 1000);

  items.push({
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
    setItemClickRate
  });

  return [hasItem, setHasItem, price, hasPurchaser, setHasPurchaser, itemClickRate, setItemClickRate];
};

export default useItem;
