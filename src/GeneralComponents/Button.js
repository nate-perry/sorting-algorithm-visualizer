import React from 'react';
import './Button.css';

import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

const LINKPAGES = ['home', 'aboutMe', 'skills', 'myWork', 'contactMe'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonLink
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) 
    ? buttonSize 
    : SIZES[0];

  const checkButtonHome = buttonLink === 'home' 
    ? '' 
    : buttonLink;

  const checkButtonLink = LINKPAGES.includes(buttonLink)
    ? checkButtonHome
    : '';

  if (checkButtonLink !== ''){
    return (
      <Link to={`/${checkButtonLink}`} className='btn-mobile'>
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }
  
};

export default Button
