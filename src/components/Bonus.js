import React from "react";

const Bonus = ({ setItemClickRate = () => {}, itemClickRate = 1, name = '' }) => {
  const handleClick = () => {
      console.log(itemClickRate);
    setItemClickRate(itemClickRate + 1);
  };

  return <button onClick={handleClick}>{name}</button>;
};

export default Bonus;
