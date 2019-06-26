import React, {useState} from 'react';
import useInterval from 'use-interval';
import './App.css';

const useClickerItem = (price = 1, money = 0, setMoney = () => {}) => {
  const [hasItem, setHasItem] = useState(0);
  const [hasPurchaser, setHasPurchaser] = useState(0);

  useInterval(() => setMoney(price * hasPurchaser + money), 1000);

  return [hasItem, setHasItem, hasPurchaser, setHasPurchaser, price];
};

function App() {
  const [money, setMoney] = useState(100);
  const [
    hasLemonade,
    setHasLemonade,
    hasLemonadePurchaser,
    setHasLemonadePurchaser,
    lemonadePrice,
  ] = useClickerItem(3, money, setMoney);

  const [
    hasIceCream,
    setHasIceCream,
    hasIceCreamPurchaser,
    setHasIceCreamPurchaser,
    iceCreamPrice,
  ] = useClickerItem(10, money, setMoney);

  const items = [
    {
      hasItem: hasLemonade,
      setHasItem: setHasLemonade,
      itemPrice: lemonadePrice,

      setHasPurchaser: setHasLemonadePurchaser,
      hasPurchaser: hasLemonadePurchaser,
      purchaserPrice: 50,

      imageUrl: 'lemonade.jpg',
      standPrice: 100,
      name: 'Lemonade Stand',
    },
    {
      hasItem: hasIceCream,
      setHasItem: setHasIceCream,
      itemPrice: iceCreamPrice,

      hasPurchaser: hasIceCreamPurchaser,
      setHasPurchaser: setHasIceCreamPurchaser,
      purchaserPrice: 100,

      imageUrl: 'ice cream.jpg',
      standPrice: 150,
      name: 'Ice Cream Stand',
    },
  ];

  const sell = (num = 1) => {
    setMoney(money + num);
  };

  const purchase = (func, value, price) => {
    func(value + 1);
    setMoney(money - price);
  };

  return (
    <div className="App">
      <header className="App-header">
        £{money}
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
  );
}

export default App;
