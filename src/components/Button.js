import React from "react";
import { css } from "emotion";

const Button = ({
  text = "",
  handleClick = () => {},
  highlightColour = "",
  lowlightColour = "",
  textColour = "",
  disabled = false,
  fullWidth = false,
}) => {
  const buttonStyles = css`
    height: 100px;
    background: ${highlightColour};
    border: 1px solid ${lowlightColour};
    width: 100px;
    color: ${textColour};
    font-family: -apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    transition: background 0.3s, border 0.3s;

    ${fullWidth && `
        width: 200px;
        height: 30px;
    `}

    &:disabled {
        background: #ddd;
        border: 1px solid #bbb;
        color: #bbb;
      }
  `;

  return (
    <button className={buttonStyles} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
