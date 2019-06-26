import React, { useState } from "react";
import useInterval from "use-interval";
import { ClassNames } from "@emotion/core";
import "./App.css";

function App() {
  const [money, setMoney] = useState(100);

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
    () => setMoney(lemonadePrice * hasLemonadePurchaser + money),
    1000
  );

  useInterval(
    () => setMoney(iceCreamPrice * hasIceCreamPurchaser + money),
    1000
  );

  useInterval(() => setMoney(pizzaPrice * hasPizzaPurchaser + money), 1000);

  const items = [
    {
      hasItem: hasLemonade,
      setHasItem: setHasLemonade,
      itemPrice: lemonadePrice,

      setHasPurchaser: setHasLemonadePurchaser,
      hasPurchaser: hasLemonadePurchaser,
      purchaserPrice: 50,

      imageUrl: "lemonade.jpg",
      standPrice: 100,
      name: "Lemonade Stand"
    },
    {
      hasItem: hasIceCream,
      setHasItem: setHasIceCream,
      itemPrice: 10,

      hasPurchaser: hasIceCreamPurchaser,
      setHasPurchaser: setHasIceCreamPurchaser,
      purchaserPrice: 75,

      imageUrl: "ice cream.jpg",
      standPrice: 150,
      name: "Ice Cream Stand"
    },
    {
      hasItem: hasPizza,
      setHasItem: setHasPizza,
      itemPrice: pizzaPrice,

      setHasPurchaser: setHasPizzaPurchaser,
      hasPurchaser: setHasPizzaPurchaser,
      purchasrPrice: 200,

      imageUrl: "pizza.jpg",
      standPrice: 400,
      name: "Pizza Shack"
    }
  ];

  const sell = (num = 1) => {
    setMoney(money + num);
  };

  const purchase = (func, value, price) => {
    func(value + 1);
    setMoney(money - price);
  };

  return (
    <ClassNames>
      {({ css }) => (
        <div className="App">
          <header className="App-header">
            <h1
              className={css`
                background: red;
              `}
            >
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
                      }
                    >
                      Purchase {item.name}
                    </button>
                  )}

                  {item.hasItem > 0 && money >= item.purchaserPrice && (
                    <button
                      onClick={() =>
                        purchase(
                          item.setHasPurchaser,
                          item.hasPurchaser,
                          item.purchaserPrice
                        )
                      }
                    >
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
