import React, { useEffect, useState } from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
    const [burgerStatus, setBurgerStatus] = useState(false);
    let location = window.location.pathname;
    useEffect(() => {
        console.log('location',window.location.pathname);
    }, [location])
  return (
    <div className="header-container">
      <a href="#/">
        Hotel Ranking
        {/* <img src="/images/logo.svg" /> */}
      </a>

      <div className="menu">
        <a href="#/" className="navStyle">
          {/* Hotel Ranking */}
        </a>
      </div>

      <div className="rightMenu">
        <Link to="/" className="navStyle">
          Home
        </Link>
        <Link to="/hotel-ranking" className="navStyle">
          Ranking
        </Link>
        <Link to="/hotel-chain" className="navStyle">
          Hotel Chain
        </Link>
        <FontAwesomeIcon
          className="pointer"
          icon="bars"
          onClick={() => setBurgerStatus(true)}
        />
      </div>

      <div className="burgerNav" style={{ transform: burgerStatus? 'translateX(0)': 'translateX(100%)'}}>
        <div className="closeWrapper">
          <FontAwesomeIcon
            icon="times"
            onClick={() => setBurgerStatus(false)}
          />
        </div>
        <li>
          <a href="#/">Hotel Ranking</a>
        </li>
        <li>
          <a href="#/">Hotel Chain</a>
        </li>
        
      </div>
    </div> 
  );
};

export default Header;