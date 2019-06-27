import React, { useReducer, useState, useEffect } from "react";
import { css } from "emotion";
import C from "color";

import Item from "./components/Item";
import Purchaser from "./components/Purchaser";
import Bonus from './components/Bonus';

import useItem from "./hooks/useItem";
import lemonadeImg from "./images/lemonade.jpg";
import iceCreamImg from "./images/icecream.jpg";
import pizzaImg from "./images/pizza.jpg";
import bikeImg from "./images/bike.jpg";
import carImg from "./images/car.jpg";
import houseImg from "./images/house.jpg";
import mansionImg from "./images/mansion.jpg";
import islandImg from "./images/island.jpg";

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
  const [money, setMoney] = useReducer(reducer, 10);
  const [colour, setColour] = useState("white");
  const [rearColour, setRearColour] = useState("white");
  const [textColour, setTextColour] = useState("black");
  const [highlightColour,setHighlightColour] = useState("#dddddd");

  useEffect(() => {
    fetch("https://api.noopschallenge.com/hexbot")
      .then(response => response.json())
      .then(myJson => {
        const resultColour = myJson.colors[0].value;
        setColour(resultColour);
        const workingColour = new C(resultColour);
        setRearColour(workingColour.darken(0.2).hex());
        const isLight = workingColour.isLight();
        setHighlightColour(workingColour.lighten(0.2).hex())
        
        setTextColour(isLight ? "black" : "white");
      });
  }, []);

  const items = [];

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
    lemonadeClickRate,
    setLemonadeClickRate
  ] = useItem(1, setMoney, 30, lemonadeImg, 10, 'Lemonade Stand', items);

  const [
    hasIceCream,
    setHasIceCream,
    iceCreamPrice,
    hasIceCreamPurchaser,
    setHasIceCreamPurchaser,
    iceCreamClickRate,  
    setIceCreamClickRate
  ] = useItem(2.5, setMoney, 50, iceCreamImg, 20, 'Ice Cream Stand', items);

  const [
    hasPizza,
    setHasPizza,
    pizzaPrice,
    hasPizzaPurchaser,
    setHasPizzaPurchaser,
    pizzaClickRate,
    setPizzaClickRate,
  ] = useItem(5, setMoney, 75, pizzaImg, 60, 'Pizza Stand', items);

  const [
    hasBike,
    setHasBike,
    bikePrice,
    hasBikePurchaser,
    setHasBikePurchaser,
    bikeClickRate,
    setBikeClickRate,
  ] = useItem(10, setMoney, 100, bikeImg, 80, "Bike Rental", items);
  

  const [
    hasCar,
    setHasCar,
    carPrice,
    hasCarPurchaser,
    setHasCarPurchaser,
    carClickRate,
    setCarClickRate,
  ] = useItem(25, setMoney, 300, carImg, 200, "Car Rental", items);

  const [
    hasHouse,
    setHasHouse,
    housePrice,
    hasHousePurchaser,
    setHasHousePurchaser,
    houseClickRate,
    setHouseClickRate,
  ] = useItem(50, setMoney, 500, houseImg, 400, "Real Estate", items);

  const [
    hasMansion,
    setHasMansion,
    mansionPrice,
    hasMansionPurchaser,
    setHasMansionPurchaser,
    mansionClickRate,
    setMansionClickRate,
  ] = useItem(150, setMoney, 600, mansionImg, 500, "Improved Real Estate", items);

  const [
    hasIsland,
    setHasIsland,
    islandPrice,
    hasIslandPurchaser,
    setHasIslandPurchaser,
    islandClickRate,
    setIslandClickRate,
  ] = useItem(300, setMoney, 800, islandImg, 650, "The Real Deal", items);


  // Sell and purchase are functions which are ran after clicking
  // buttons and images. We use these to change the amount of money we have,
  // and in the case of purchase, change the amount of a stand or seller we have.
  const sell = (amount = 1, clickRate = 1) => {
    setMoney(amount * clickRate);
  };

  // func is the function that updates the value of the item we have purchased
  // value is the current amount of items we have, and amount is the price of the item.
  const purchase = (func, value, amount) => {
    func(value + 1);
    setMoney(amount);
  };

  const rearStyles = css`
    width: 100vw;
    height: 100vh;
    background: ${rearColour};
  `;

  const bodyStyles = css`
    background: ${colour};
    color: ${textColour};
    height: 100vh;
    border-radius: 40px;
    width: 800px;
    margin: 0 auto;
  `;

  const headerStyles = css`
    margin-left: 20px;
    padding-top: 20px;
  `;

  const mainStyles = css`
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
  `;

  const merchandiseStyles = css`
    flex: 2;
  `;

  const sellerStyles = css`
    flex: 1;
  `;

  // Build the elements using the values and functions we have created earlier
  return (
    <div className={rearStyles}>
      <div className={bodyStyles}>
        <header className={headerStyles}>
          <h1>£{money}</h1>
        </header>
        <main className={mainStyles}>
          <div className={merchandiseStyles}>
            <h2>Merchandise</h2>
            <ul>
              {items.map(item => (
                <Item
                  key={item.name}
                  purchase={purchase}
                  money={money}
                  sell={sell}
                  highlightColour={highlightColour}
                  lowlightColour={rearColour}
                  {...item}
                />
              ))}
            </ul>
            <div className={css`clear: both;`} />
            <h2>Bonuses</h2>
            <ul>
              {items.map(item => (
                <Bonus
                  key={item.name}
                  {...item}
                />
              ))}
            </ul>
          </div>

          <div className={sellerStyles}>
            <h2>Sellers</h2>
            <p>
              Sellers will sell items for you. They are not as efficient as you,
              but you get to put your feet up.
            </p>
            <ul>
              {items.map(item => (
                <Purchaser
                  key={item.name}
                  money={money}
                  purchase={purchase}
                  highlightColour={highlightColour}
                  lowlightColour={rearColour}
                  {...item}
                />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
