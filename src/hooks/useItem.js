import {useState} from 'react';
import useInterval from 'use-interval';

const useItem = (price = 0, setMoney) => {
  const [hasItem, setHasItem] = useState(0);
  const [hasPurchaser, setHasPurchaser] = useState(0);

  useInterval(() => setMoney(hasPurchaser * price), 1000);

  return [hasItem, setHasItem, price, hasPurchaser, setHasPurchaser];
};

export default useItem;
