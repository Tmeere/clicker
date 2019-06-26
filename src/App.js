import React, {useState, useReducer} from 'react';
import useInterval from 'use-interval';
import {ClassNames} from '@emotion/core';
import Typography from 'typography';

import lemonadeImg from './lemonade.jpg';
import iceCreamImg from './icecream.jpg';
import pizzaImg from './pizza.jpg';
import './App.css';

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

function App() {
  const [money, setMoney] = useReducer(reducer, 100);

  const [hasLemonade, setHasLemonade] = useState(0);
  const [hasLemonadePurchaser, setHasLemonadePurchaser] = useState(0);
  const lemonadePrice = 3;

  const [hasIceCream, setHasIceCream] = useState(0);
  const [hasIceCreamPurchaser, setHasIceCreamPurchaser] = useState(0);
  const iceCreamPrice = 10;

  const [hasPizza, setHasPizza] = useState(0);
  const [hasPizzaPurchaser, setHasPizzaPurchaser] = useState(0);
  const pizzaPrice = 20;

  useInterval(
    () =>
      setMoney({
        type: 'increment',
        amount: hasLemonadePurchaser * lemonadePrice,
      }),
    1000,
  );

  useInterval(
    () =>
      setMoney({
        type: 'increment',
        amount: hasIceCreamPurchaser * iceCreamPrice,
      }),
    1000,
  );

  useInterval(
    () => setMoney({type: 'increment', amount: hasPizzaPurchaser * pizzaPrice}),
    1000,
  );

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
      itemPrice: 10,

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
        <div className="App">
          <header className="App-header">
            <h1>£{money}</h1>
            <div
              className={css`
                display: flex;
              `}>
              <ul>
                {items.map(item => (
                  <li>
                    {item.hasItem > 0 && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        onClick={() => sell(item.itemPrice)}
                      />
                    )}

                    {money >= item.standPrice && !item.hasItem && (
                      <button
                        onClick={() =>
                          purchase(
                            item.setHasItem,
                            item.hasItem,
                            item.standPrice,
                          )
                        }>
                        Purchase {item.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <ul>
                {items.map(item => (
                  <li>
                    {item.hasItem > 0 && money >= item.purchaserPrice && (
                      <button
                        onClick={() =>
                          purchase(
                            item.setHasPurchaser,
                            item.hasPurchaser,
                            item.purchaserPrice,
                          )
                        }>
                        Purchase {item.name} Buyer
                      </button>
                    )}
                  </li>
                ))}{' '}
              </ul>
            </div>
          </header>
        </div>
      )}
    </ClassNames>
  );
}

export default App;
