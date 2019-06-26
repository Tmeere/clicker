import React, {useState, useReducer} from 'react';
import useInterval from 'use-interval';
import {ClassNames} from '@emotion/core';
import Typography from 'typography';

import Item from './components/Item';
import Purchaser from './components/Purchaser';

import lemonadeImg from './images/lemonade.jpg';
import iceCreamImg from './images/icecream.jpg';
import pizzaImg from './images/pizza.jpg';

const typography = new Typography();

typography.injectStyles();

const reducer = (money, action) => {
  switch (action.type) {
    case 'increment':
      return money + action.amount;
    case 'decrement':
      return money - action.amount;
    default:
      return money;
  }
};

const useItem = (price = 0, setMoney) => {
  const [hasItem, setHasItem] = useState(0);
  const [hasPurchaser, setHasPurchaser] = useState(0);

  useInterval(
    () =>
      setMoney({
        type: 'increment',
        amount: hasPurchaser * price,
      }),
    1000,
  );

  return [hasItem, setHasItem, price, hasPurchaser, setHasPurchaser];
};

function App() {
  const [money, setMoney] = useReducer(reducer, 100);

  const [
    hasLemonade,
    setHasLemonade,
    lemonadePrice,
    hasLemonadePurchaser,
    setHasLemonadePurchaser,
  ] = useItem(3, setMoney);

  const [
    hasIceCream,
    setHasIceCream,
    iceCreamPrice,
    hasIceCreamPurchaser,
    setHasIceCreamPurchaser,
  ] = useItem(10, setMoney);

  const [
    hasPizza,
    setHasPizza,
    pizzaPrice,
    hasPizzaPurchaser,
    setHasPizzaPurchaser,
  ] = useItem(20, setMoney);

  const items = [
    {
      hasItem: hasLemonade,
      setHasItem: setHasLemonade,
      itemPrice: lemonadePrice,

      hasPurchaser: hasLemonadePurchaser,
      setHasPurchaser: setHasLemonadePurchaser,
      purchaserPrice: 50,

      imageUrl: lemonadeImg,
      standPrice: 100,
      name: 'Lemonade Stand',
    },
    {
      hasItem: hasIceCream,
      setHasItem: setHasIceCream,
      itemPrice: iceCreamPrice,

      hasPurchaser: hasIceCreamPurchaser,
      setHasPurchaser: setHasIceCreamPurchaser,
      purchaserPrice: 75,

      imageUrl: iceCreamImg,
      standPrice: 150,
      name: 'Ice Cream Stand',
    },
    {
      hasItem: hasPizza,
      setHasItem: setHasPizza,
      itemPrice: pizzaPrice,

      hasPurchaser: hasPizzaPurchaser,
      setHasPurchaser: setHasPizzaPurchaser,
      purchaserPrice: 200,

      imageUrl: pizzaImg,
      standPrice: 400,
      name: 'Pizza Shack',
    },
  ];

  const sell = (amount = 1) => {
    setMoney({type: 'increment', amount});
  };

  const purchase = (func, value, amount) => {
    func(value + 1);
    setMoney({type: 'decrement', amount});
  };

  return (
    <ClassNames>
      {({css}) => (
        <>
          <header>
            <h1>£{money}</h1>
          </header>
          <main
            className={css`
              display: flex;
            `}>
            <div
              className={css`
                flex: 1;
              `}>
              <ul>
                {items.map(item => (
                  <Item
                    key={item.name}
                    purchase={purchase}
                    money={money}
                    sell={sell}
                    {...item}
                  />
                ))}
              </ul>
            </div>

            <div
              className={css`
                flex: 1;
              `}>
              <ul>
                {items.map(item => (
                  <Purchaser
                    key={item.name}
                    money={money}
                    purchase={purchase}
                    {...item}
                  />
                ))}
              </ul>
            </div>
          </main>
        </>
      )}
    </ClassNames>
  );
}

export default App;
