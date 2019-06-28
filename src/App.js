import React, { useReducer, useState, useEffect } from "react";
import { css } from "emotion";
import C from "color";

import Item from "./components/Item";
import Purchaser from "./components/Purchaser";
import Bonus from "./components/Bonus";

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

const App = () => {
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
  const [colour, setColour] = useState("#eee");

  const workingColour = new C(colour);
  const textColour = workingColour.isLight() ? "#000" : "#fff";
  const lowlightColour = workingColour.darken(0.2).hex();
  const highlightColour = workingColour.lighten(0.2).hex();

  useEffect(() => {
    fetch("https://api.noopschallenge.com/hexbot")
      .then(response => response.json())
      .then(myJson => setColour(myJson.colors[0].value));
  }, []);

  // React allows us to make our own hooks. This means
  // that I can reuse the item creation logic. This
  // is amazing when compared to old versions of React.
  //
  // I'm making sure to create a new copy of items
  // each time we add to it, to make sure that our
  // useItem calls don't mess with one another. This
  // is a major source of bugs, when things use the
  // same variable and don't know about one another.
  //
  // Facebook once had an issue with the notifications
  // alert showing notifications when you didn't have
  // any precisely for this reason. Their fix was to
  // make React.
  const items = [
    useItem(
      "Lemonade Stand",
      "Hire Lemonade Squeezer",
      "2x Boost Lemonade",
      lemonadeImg,
      setMoney,
      1,
      30,
      10,
      100
    ),
    useItem(
      "Ice Cream Stand",
      "Hire Ice Cream Makers",
      "2x Boost Ice Cream",
      iceCreamImg,
      setMoney,
      2.5,
      50,
      20,
      300
    ),
    useItem(
      "Pizza Stand",
      "Hire Pizza Makers",
      "2x Boost Pizza",
      pizzaImg,
      setMoney,
      5,
      75,
      60,
      550
    ),
    useItem(
      "Bike Rental",
      "Hire Bike Rental",
      "2x Boost Bike Rental",
      bikeImg,
      setMoney,
      10,
      100,
      80,
      750
    ),
    useItem(
      "Car Rental",
      "Hire Car Rental",
      "2x Boost Car Rental",
      carImg,
      setMoney,
      25,
      300,
      200,
      850
    ),
    useItem(
      "Real Estate",
      "Hire Real Estate",
      "2x House Boost",
      houseImg,
      setMoney,
      50,
      500,
      400,
      1000
    ),
    useItem(
      "Developed Real Estate",
      "Purchase More land ",
      "2x Mansion Boost",
      mansionImg,
      setMoney,
      150,
      600,
      500,
      2000
    ),
    useItem(
      "The Real Deal",
      "Upgrade Real Deal",
      "2x Real Deal Boost",
      islandImg,
      setMoney,
      300,
      800,
      650,
      3000
    )
  ];

  // Sell and purchase are functions which are ran after clicking
  // buttons and images. We use these to change the amount of money we have,
  // and in the case of purchase, change the amount of a stand or seller we have.
  const sell = (amount = 1, clickRate = 1) => {
    setMoney(amount * clickRate);
  };

  // func is the function that updates the value of the item we have purchased
  // value is the current amount of items we have, and amount is the price of the item.
  const purchase = (func = () => {}, value = 0, amount = 0) => {
    func(value + 1);
    setMoney(amount);
  };

  const rearStyles = css`
    width: 100vw;
    height: 100vh;
    background: ${lowlightColour};
    border: 20px solid ${lowlightColour};
    transition: background 0.3s, border 0.3s;
  `;

  const bodyStyles = css`
    background: ${colour};
    color: ${textColour};
    border-radius: 40px;
    width: 800px;
    margin: 0 auto;
    transition: background: 0.3s, color: 0.3s;
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

  const clearfixStyles = css`
    clear: both;
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
                  lowlightColour={lowlightColour}
                  textColour={textColour}
                  {...item}
                />
              ))}
            </ul>
            <div className={clearfixStyles} />
            <h2>Bonuses</h2>
            <ul>
              {items.map(item => (
                <Bonus
                  key={item.name}
                  {...item}
                  highlightColour={highlightColour}
                  lowlightColour={lowlightColour}
                  textColour={textColour}
                  money={money}
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
                  lowlightColour={lowlightColour}
                  textColour={textColour}
                  {...item}
                />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
