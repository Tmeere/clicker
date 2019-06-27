import React, {useReducer} from 'react';
import {css} from 'emotion';

import Item from './components/Item';
import Purchaser from './components/Purchaser';

import useItem from './hooks/useItem';

import lemonadeImg from './images/lemonade.jpg';
import iceCreamImg from './images/icecream.jpg';
import pizzaImg from './images/pizza.jpg';

const reducer = (money = 0, amount = 0) => money + amount;

function App() {
  // We use useReducer to create the money variable.
  // We need to use useReducer rather than useState
  // because we have three items that use it, very
  // quickly after each other.
  //
  // For some reason (batching?) we ran into situations
  // where some of the changes to the state was ignored
  //
  // With useReducer, we provide the reducer function
  // ourselves, so we can make sure nothing gets missed.
  const [money, setMoney] = useReducer(reducer, 100);

  // React allows us to make our own hooks. This means
  // that I can reuse the item creation logic. This
  // is amazing when compared to old versions of React.
  //
  // useItem wants the price of the item, and a function
  // which updates the money value. It returns everything
  // we need to create items.
  const [
    hasLemonade, // Lets us know if we have purchased the lemonade stand
    setHasLemonade, // lets us say we have purchased the stand
    lemonadePrice,
    hasLemonadePurchaser, // Lets us know how many lemonade sellers we have
    setHasLemonadePurchaser, // Lets us update the amount of lemonade sellers
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

  // One of the most simple ways to avoid bugs in your code
  // is to make sure that the data you are working with is
  // exactly how you want it, as soon as you can. Here
  // we are creating a list of items which have everything
  // they need. By getting it right here, we can avoid bugs
  // later. By making a list of items, we can avoid having
  // to write tedious code for each item later.
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

  // Sell and purchase are functions which are ran after clicking
  // buttons and images. We use these to change the amount of money we have,
  // and in the case of purchase, change the amount of a stand or seller we have.
  const sell = (amount = 1) => {
    setMoney(amount);
  };

  // func is the function that updates the value of the item we have purchased
  // value is the current amount of items we have, and amount is the price of the item.
  const purchase = (func, value, amount) => {
    func(value + 1);
    setMoney(amount);
  };

  // Build the elements using the values and functions we have created earlier
  return (
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
            flex: 2;
          `}>
          <h2>Items</h2>
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
          <h2>Sellers</h2>
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
  );
}

export default App;
