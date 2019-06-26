import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [money, setMoney] = useState(100);
  const [hasLemonade, setHasLemonade] = useState(false);
  const [hasLemonadePurchaser, setHasLemonadePurchaser] = useState(false);
  const [hasIceCream, setHasIceCream] = useState(false);
  const items = [
    {
      purchased: hasLemonade,
      purchaseFunction: setHasLemonade,
      purchaserFunction: setHasLemonadePurchaser,
      purchaserPurchased: hasLemonadePurchaser,
      imageUrl: 'lemonade.jpg',
      standPrice: 100,
      purchaserPrice: 50,
      itemPrice: 3,
      name: 'Lemonade Stand'
    },
    {
      purchased: hasIceCream,
      purchaseFunction: setHasIceCream,
      imageUrl: 'ice cream.jpg',
      standPrice: 150,
      itemPrice: 10,
      name: 'Ice Cream Stand'
    }
  ];
  
  useEffect(() => {
    if (hasLemonadePurchaser) {
      const purchaseItem = setInterval(() => {
        setMoney(money + 3);
      }, 1000);

      return () => {
        clearInterval(purchaseItem)
      }
    }
  }, [hasLemonadePurchaser, money]);
  
  const sell = (num = 1) => {
    setMoney(money + num);
  }

  const purchaseStand = (func, price) => {
    func(true);
    setMoney(money - price);
  }

  return (
    <div className="App">
      <header className="App-header">
        {money}

        <ul>
          {items.map((item) => (
            <li>
              {item.purchased && (
                <img src={item.imageUrl} onClick={() => sell(item.itemPrice)} />
              )}

              {money >= item.standPrice && !item.purchased && (
                <button onClick={() => purchaseStand(item.purchaseFunction, item.standPrice)}>Purchase {item.name}</button>
              )}

              {item.purchased && money >= item.purchaserPrice && !item.purchaserPurchased && (
                <button onClick={() => purchaseStand(item.purchaserFunction, item.purchaserPrice)}>Purchase {item.name} Buyer</button>
              )}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
