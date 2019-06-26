import React, {useState, useReducer} from 'react';
import useInterval from 'use-interval';
import {ClassNames} from '@emotion/core';
import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {money: state.money + action.amount};
    case 'decrement':
      return {money: state.money - action.amount};
    default:
      return state;
  }
};

function App() {
  const [{money}, dispatch] = useReducer(reducer, {money: 100});

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
      dispatch({
        type: 'increment',
        amount: hasLemonadePurchaser * lemonadePrice,
      }),
    1000,
  );

  useInterval(
    () =>
      dispatch({
        type: 'increment',
        amount: hasIceCreamPurchaser * iceCreamPrice,
      }),
    1000,
  );

  useInterval(
    () => dispatch({type: 'increment', amount: hasPizzaPurchaser * pizzaPrice}),
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

      imageUrl: 'lemonade.jpg',
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

      imageUrl: 'ice cream.jpg',
      standPrice: 150,
      name: 'Ice Cream Stand',
    },
    {
      hasItem: hasPizza,
      setHasItem: setHasPizza,
      itemPrice: pizzaPrice,

      hasPurchaser: hasPizzaPurchaser,
      setHasPurchaser: setHasPizzaPurchaser,
      purchasePrice: 200,

      imageUrl: 'pizza.jpg',
      standPrice: 400,
      name: 'Pizza Shack',
    },
  ];

  const sell = (num = 1) => {
    dispatch({type: 'increment', amount: num});
  };

  const purchase = (func, value, price) => {
    func(value + 1);
    dispatch({type: 'decrement', amount: price});
  };

  return (
    <ClassNames>
      {({css}) => (
        <div className="App">
          <header className="App-header">
            <h1
              className={css`
                background: red;
              `}>
              £{money}
            </h1>
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
                        purchase(item.setHasItem, item.hasItem, item.standPrice)
                      }>
                      Purchase {item.name}
                    </button>
                  )}

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
              ))}
            </ul>
          </header>
        </div>
      )}
    </ClassNames>
  );
}

export default App;
